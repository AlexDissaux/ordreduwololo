import { Injectable, Logger } from '@nestjs/common';
import { Aoe4WorldPlayer, Aoe4WorldResponse } from './player.types';
import { Player } from './entities';

@Injectable()
export class PlayerApiService {
  private readonly logger = new Logger(PlayerApiService.name);
  private readonly API_BASE_URL = 'https://aoe4world.com/api/v0';
  private readonly SEARCH_QUERY = '[ODW]';

  async fetchAllPlayers(): Promise<Aoe4WorldPlayer[]> {
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

      const totalFetched = (page - 1) * data.per_page + data.count;
      hasMore = totalFetched < data.total_count;
      page++;

      if (hasMore) {
        await this.delay(200);
      }
    }

    return allPlayers;
  }

  mapToEntity(apiPlayer: Aoe4WorldPlayer): Partial<Player> {
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

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
