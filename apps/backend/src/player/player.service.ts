import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, IsNull, MoreThan, Repository } from 'typeorm';
import { Player } from './entities';
import { PlayerApiService } from './player-api.service';
import { SyncResult } from './player.types';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly playerApiService: PlayerApiService,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find({
      order: { rmSoloRating: 'DESC' },
    });
  }

  async findLeaderboardSolo(): Promise<Player[]> {
    return this.playerRepository.find({
      select: ['profileId', 'name', 'rmSoloRating', 'rmSoloRankLevel', 'rmSoloGamesCount', 'rmSoloWinsCount', 'rmSoloLossesCount'],
      where: { rmSoloRating: Not(IsNull()) },
      order: { rmSoloRating: 'DESC' },
    });
  }

  async findAllProfileIdsFromActivePlayers(): Promise<number[]> {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const players = await this.playerRepository.find({
      select: ['profileId'],
      where: { lastGameAt: MoreThan(since) },
    });
    return players.map(player => player.profileId);
  }

  async findAllProfileIds(): Promise<number[]> {
    const players = await this.playerRepository.find({
      select: ['profileId'],
    });
    return players.map(player => player.profileId);
  }

  async findOne(profileId: number): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: { profileId },
    });
  }

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
      const existingPlayers = await this.playerRepository.find({
        select: ['profileId', 'lastGameAt'],
      });
      const existingPlayersMap = new Map(existingPlayers.map(p => [p.profileId, p]));

      const toUpsert: Partial<Player>[] = [];

      for (const apiPlayer of allPlayers) {
        const existing = existingPlayersMap.get(apiPlayer.profile_id);
        const updatedTime = apiPlayer.last_game_at ? new Date(apiPlayer.last_game_at).getTime() : 0;

        if (!existing) {
          toUpsert.push(this.playerApiService.mapToEntity(apiPlayer));
          result.added++;
        } else if (existing?.lastGameAt?.getTime() ?? 0 !== updatedTime) {
          toUpsert.push(this.playerApiService.mapToEntity(apiPlayer));
          result.updated++;
        } else {
          result.unchanged++;
        }
      }

      // Batch upsert all new/changed players
      if (toUpsert.length > 0) {
        await this.playerRepository.upsert(toUpsert, ['profileId']);
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
