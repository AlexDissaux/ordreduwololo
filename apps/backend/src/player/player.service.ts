import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, IsNull, Repository } from 'typeorm';
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

      for (const apiPlayer of allPlayers) {
        const existingPlayer = await this.playerRepository.findOne({
          where: { profileId: apiPlayer.profile_id },
        });

        const playerData = this.playerApiService.mapToEntity(apiPlayer);

        if (!existingPlayer) {
          await this.playerRepository.save(playerData);
          result.added++;
          this.logger.log(`Added new player: ${apiPlayer.name} (${apiPlayer.profile_id})`);
        } else if (this.hasPlayerChanged(existingPlayer, playerData)) {
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

      this.logger.log(
        `Sync complete: ${result.added} added, ${result.updated} updated, ${result.unchanged} unchanged`,
      );
      return result;
    } catch (error) {
      this.logger.error('Failed to sync players:', error);
      throw error;
    }
  }

  private hasPlayerChanged(existing: Player, updated: Partial<Player>): boolean {
    const fieldsToCompare: (keyof Player)[] = [
      'name', 'steamId', 'country',
      'avatarSmall', 'avatarMedium', 'avatarFull',
      'twitchUrl', 'youtubeUrl',
      'rmSoloRating', 'rmSoloRank', 'rmSoloRankLevel',
      'rmSoloGamesCount', 'rmSoloWinsCount', 'rmSoloLossesCount',
      'rmTeamRating', 'rmTeamRank', 'rmTeamRankLevel',
      'rmTeamGamesCount', 'rmTeamWinsCount', 'rmTeamLossesCount',
    ];

    for (const field of fieldsToCompare) {
      if (existing[field] !== updated[field]) {
        return true;
      }
    }

    if (updated.lastGameAt) {
      const existingTime = existing.lastGameAt?.getTime() || 0;
      const updatedTime = updated.lastGameAt.getTime();
      if (existingTime !== updatedTime) {
        return true;
      }
    }

    return false;
  }
}
