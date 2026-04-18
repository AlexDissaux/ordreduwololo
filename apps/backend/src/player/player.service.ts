import { Injectable } from '@nestjs/common';
import { PlayerApiService } from './player-api.service';
import { mapPlayerToEntity } from './player.mapper';
import { PlayerRepository } from './player.repository';
import { LeaderboardCacheService } from '../leaderboard/leaderboard-cache.service';

@Injectable()
export class PlayerService {

  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly playerApiService: PlayerApiService,
    private readonly leaderboardCacheService: LeaderboardCacheService,
  ) {}

  async syncPlayers(): Promise<void> {
    const allPlayers = await this.playerApiService.fetchAllPlayers();

    const entities = allPlayers.map(apiPlayer => mapPlayerToEntity(apiPlayer));

    await this.playerRepository.upsert(entities);
    this.leaderboardCacheService.setLeaderboard([]);
  }

}
