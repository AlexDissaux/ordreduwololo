import { Injectable } from '@nestjs/common';
import { PlayerApiService } from './player-api.service';
import { mapPlayerToEntity } from './player.mapper';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {

  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly playerApiService: PlayerApiService,
  ) {}

  async syncPlayers(): Promise<void> {
    const allPlayers = await this.playerApiService.fetchAllPlayers();

    const entities = allPlayers.map(apiPlayer => mapPlayerToEntity(apiPlayer));

    await this.playerRepository.upsert(entities);
  }

}
