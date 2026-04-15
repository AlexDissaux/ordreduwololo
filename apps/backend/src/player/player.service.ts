import { Injectable, Logger } from '@nestjs/common';
import { PlayerApiService } from './player-api.service';
import { mapPlayerToEntity } from './player.mapper';
import { PlayerRepository } from './player.repository';
import { SyncResult } from './player.types';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly playerApiService: PlayerApiService,
  ) {}

  async syncPlayers(): Promise<SyncResult> {
    const result: SyncResult = {
      added: 0,
      updated: 0,
      unchanged: 0,
      total: 0,
      syncedAt: new Date().toISOString(),
    };

    try {
      const allPlayers = await this.playerApiService.fetchAllPlayers();
      this.logger.log(`Fetched ${allPlayers.length} players from API`);
      result.total = allPlayers.length;

      // Only load the fields needed to detect changes
      const existingPlayers = await this.playerRepository.findForSync();
      const existingPlayersMap = new Map(existingPlayers.map(p => [p.profileId, p]));

      const toUpsert: Partial<Player>[] = [];

      for (const apiPlayer of allPlayers) {
        const existing = existingPlayersMap.get(apiPlayer.profile_id);
        const updatedTime = apiPlayer.last_game_at ? new Date(apiPlayer.last_game_at).getTime() : 0;

        if (!existing) {
          toUpsert.push(mapPlayerToEntity(apiPlayer));
          result.added++;
        } else if (existing?.lastGameAt?.getTime() ?? 0 !== updatedTime) {
          toUpsert.push(mapPlayerToEntity(apiPlayer));
          result.updated++;
        } else {
          result.unchanged++;
        }
      }

      // Batch upsert all new/changed players
      if (toUpsert.length > 0) {
        await this.playerRepository.upsert(toUpsert);
        this.logger.log(`Upserted ${toUpsert.length} players`);
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

}
