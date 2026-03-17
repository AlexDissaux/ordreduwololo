import { Injectable, Logger } from '@nestjs/common';
import {
  Aoe4WorldLeaderboardPlayer,
  Aoe4WorldLeaderboardResponse,
  FRENCH_SPEAKING_COUNTRIES,
  LEADERBOARDS,
  LeaderboardType,
  MergedPlayer,
} from './player.types';
import { Player } from './entities';
import { delay } from '../common/utils/delay.service';

@Injectable()
export class PlayerApiService {
  private readonly logger = new Logger(PlayerApiService.name);
  private readonly API_BASE_URL = 'https://aoe4world.com/api/v0';

  async fetchAllPlayers(): Promise<MergedPlayer[]> {
    const playerMap = new Map<number, MergedPlayer>();

    for (const leaderboard of LEADERBOARDS) {
      for (const country of FRENCH_SPEAKING_COUNTRIES) {
        const players = await this.fetchLeaderboard(leaderboard, country);
        this.logger.log(
          `Fetched ${players.length} players from ${leaderboard} leaderboard for country ${country}`,
        );

        for (const player of players) {
          const existing = playerMap.get(player.profile_id);
          if (existing) {
            existing[leaderboard] = this.extractStats(player);
            if (player.last_game_at > existing.last_game_at) {
              existing.last_game_at = player.last_game_at;
              existing.name = player.name;
              existing.social = player.social;
            }
          } else {
            playerMap.set(player.profile_id, {
              profile_id: player.profile_id,
              name: player.name,
              steam_id: player.steam_id,
              country: player.country,
              social: player.social,
              last_game_at: player.last_game_at,
              [leaderboard]: this.extractStats(player),
            });
          }
        }
      }
    }

    return Array.from(playerMap.values());
  }

  mapToEntity(player: MergedPlayer): Partial<Player> {
    const rmSolo = player.rm_solo;
    const rmTeam = player.rm_team;

    return {
      profileId: player.profile_id,
      name: player.name,
      steamId: player.steam_id,
      country: player.country,
      twitchUrl: player.social?.twitch,
      youtubeUrl: player.social?.youtube,
      lastGameAt: player.last_game_at ? new Date(player.last_game_at) : null,
      rmSoloRating: rmSolo?.rating,
      rmSoloRank: rmSolo?.rank,
      rmSoloRankLevel: rmSolo?.rank_level,
      rmSoloGamesCount: rmSolo?.games_count,
      rmSoloWinsCount: rmSolo?.wins_count,
      rmSoloLossesCount: rmSolo?.losses_count,
      rmSoloWinRate: rmSolo?.win_rate,
      rmTeamRating: rmTeam?.rating,
      rmTeamRank: rmTeam?.rank,
      rmTeamRankLevel: rmTeam?.rank_level,
      rmTeamGamesCount: rmTeam?.games_count,
      rmTeamWinsCount: rmTeam?.wins_count,
      rmTeamLossesCount: rmTeam?.losses_count,
      rmTeamWinRate: rmTeam?.win_rate,
    };
  }

  private async fetchLeaderboard(
    leaderboard: LeaderboardType,
    country: string,
  ): Promise<Aoe4WorldLeaderboardPlayer[]> {
    const allPlayers: Aoe4WorldLeaderboardPlayer[] = [];
    const MAX_PAGES = 1000; // Safety limit to prevent infinite loops
    let page = 1;
    let hasMore = true;
    this.logger.debug(`Starting to fetch leaderboard ${leaderboard} for country ${country}`);
    while (hasMore && page <= MAX_PAGES) {
      const url = `${this.API_BASE_URL}/leaderboards/${leaderboard}?country=${encodeURIComponent(country)}&page=${page}`;
      // this.logger.debug(`Fetching page ${page}: ${url}`);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as Aoe4WorldLeaderboardResponse;
      allPlayers.push(...data.players);

      const totalFetched = (page - 1) * data.per_page + data.count;
      hasMore = totalFetched < data.total_count;
      page++;

      if (hasMore) {
        await delay(200);
      }
    }

    return allPlayers;
  }

  private extractStats(player: Aoe4WorldLeaderboardPlayer) {
    return {
      rating: player.rating,
      rank: player.rank,
      rank_level: player.rank_level,
      games_count: player.games_count,
      wins_count: player.wins_count,
      losses_count: player.losses_count,
      win_rate: player.win_rate,
    };
  }
}
