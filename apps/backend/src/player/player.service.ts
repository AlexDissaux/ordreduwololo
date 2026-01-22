import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities';

export interface SyncResult {
  added: number;
  updated: number;
  unchanged: number;
  total: number;
  syncedAt: string;
}

interface Aoe4WorldPlayer {
  profile_id: number;
  name: string;
  steam_id: string;
  country: string;
  avatars: {
    small: string | null;
    medium: string | null;
    full: string | null;
  };
  social: {
    twitch?: string;
    youtube?: string;
  };
  last_game_at: string;
  leaderboards: {
    rm_solo?: {
      rating: number;
      rank: number;
      rank_level: string;
      games_count: number;
      wins_count: number;
      losses_count: number;
      win_rate: number;
    };
    rm_team?: {
      rating: number;
      rank: number;
      rank_level: string;
      games_count: number;
      wins_count: number;
      losses_count: number;
      win_rate: number;
    };
  };
}

interface Aoe4WorldResponse {
  total_count: number;
  page: number;
  per_page: number;
  count: number;
  players: Aoe4WorldPlayer[];
}

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);
  private readonly API_BASE_URL = 'https://aoe4world.com/api/v0';
  private readonly SEARCH_QUERY = '[ODW]';

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find({
      order: { rmSoloRating: 'DESC' },
    });
  }

  async findOne(profileId: number): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: { profileId },
    });
  }

  /**
   * Fetch players from aoe4world API and sync with database
   */
  async syncPlayers(): Promise<SyncResult> {
    const result: SyncResult = {
      added: 0,
      updated: 0,
      unchanged: 0,
      total: 0,
      syncedAt: new Date().toISOString(),
    };

    try {
      const allPlayers = await this.fetchAllPlayersFromApi();
      this.logger.log(`Fetched ${allPlayers.length} players from API`);
      result.total = allPlayers.length;

      for (const apiPlayer of allPlayers) {
        const existingPlayer = await this.playerRepository.findOne({
          where: { profileId: apiPlayer.profile_id },
        });

        const playerData = this.mapApiPlayerToEntity(apiPlayer);

        if (!existingPlayer) {
          // New player - insert
          await this.playerRepository.save(playerData);
          result.added++;
          this.logger.log(`Added new player: ${apiPlayer.name} (${apiPlayer.profile_id})`);
        } else {
          // Check if player data has changed
          if (this.hasPlayerChanged(existingPlayer, playerData)) {
            await this.playerRepository.update(
              { profileId: apiPlayer.profile_id },
              playerData,
            );
            result.updated++;
            this.logger.log(`Updated player: ${apiPlayer.name} (${apiPlayer.profile_id})`);
          } else {
            result.unchanged++;
          }
        }
      }

      this.logger.log(
        `Sync complete: ${result.added} added, ${result.updated} updated, ${result.unchanged} unchanged`,
      );
      return result;
    } catch (error) {
      this.logger.error('Failed to sync players:', error);
      throw error;
    }
  }

  /**
   * Fetch all players with pagination from the API
   */
  private async fetchAllPlayersFromApi(): Promise<Aoe4WorldPlayer[]> {
    const allPlayers: Aoe4WorldPlayer[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `${this.API_BASE_URL}/players/search?query=${encodeURIComponent(this.SEARCH_QUERY)}&page=${page}`;
      this.logger.debug(`Fetching page ${page}: ${url}`);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as Aoe4WorldResponse;
      allPlayers.push(...data.players);

      // Check if there are more pages
      const totalFetched = (page - 1) * data.per_page + data.count;
      hasMore = totalFetched < data.total_count;
      page++;

      // Add a small delay to avoid rate limiting
      if (hasMore) {
        await this.delay(200);
      }
    }

    return allPlayers;
  }

  /**
   * Map API player data to entity
   */
  private mapApiPlayerToEntity(apiPlayer: Aoe4WorldPlayer): Partial<Player> {
    const rmSolo = apiPlayer.leaderboards?.rm_solo;
    const rmTeam = apiPlayer.leaderboards?.rm_team;

    return {
      profileId: apiPlayer.profile_id,
      name: apiPlayer.name,
      steamId: apiPlayer.steam_id,
      country: apiPlayer.country,
      avatarSmall: apiPlayer.avatars?.small,
      avatarMedium: apiPlayer.avatars?.medium,
      avatarFull: apiPlayer.avatars?.full,
      twitchUrl: apiPlayer.social?.twitch,
      youtubeUrl: apiPlayer.social?.youtube,
      lastGameAt: apiPlayer.last_game_at ? new Date(apiPlayer.last_game_at) : null,
      // RM Solo stats
      rmSoloRating: rmSolo?.rating,
      rmSoloRank: rmSolo?.rank,
      rmSoloRankLevel: rmSolo?.rank_level,
      rmSoloGamesCount: rmSolo?.games_count,
      rmSoloWinsCount: rmSolo?.wins_count,
      rmSoloLossesCount: rmSolo?.losses_count,
      rmSoloWinRate: rmSolo?.win_rate,
      // RM Team stats
      rmTeamRating: rmTeam?.rating,
      rmTeamRank: rmTeam?.rank,
      rmTeamRankLevel: rmTeam?.rank_level,
      rmTeamGamesCount: rmTeam?.games_count,
      rmTeamWinsCount: rmTeam?.wins_count,
      rmTeamLossesCount: rmTeam?.losses_count,
      rmTeamWinRate: rmTeam?.win_rate,
    };
  }

  /**
   * Check if player data has changed (compare relevant fields)
   */
  private hasPlayerChanged(existing: Player, updated: Partial<Player>): boolean {
    const fieldsToCompare: (keyof Player)[] = [
      'name',
      'steamId',
      'country',
      'avatarSmall',
      'avatarMedium',
      'avatarFull',
      'twitchUrl',
      'youtubeUrl',
      'rmSoloRating',
      'rmSoloRank',
      'rmSoloRankLevel',
      'rmSoloGamesCount',
      'rmSoloWinsCount',
      'rmSoloLossesCount',
      'rmTeamRating',
      'rmTeamRank',
      'rmTeamRankLevel',
      'rmTeamGamesCount',
      'rmTeamWinsCount',
      'rmTeamLossesCount',
    ];

    for (const field of fieldsToCompare) {
      if (existing[field] !== updated[field]) {
        return true;
      }
    }

    // Compare dates separately (need to compare timestamps)
    if (updated.lastGameAt) {
      const existingTime = existing.lastGameAt?.getTime() || 0;
      const updatedTime = updated.lastGameAt.getTime();
      if (existingTime !== updatedTime) {
        return true;
      }
    }

    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
