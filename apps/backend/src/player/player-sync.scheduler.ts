import { Injectable, Logger } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PlayerService } from './player.service';

@Injectable()
export class PlayerSyncScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(PlayerSyncScheduler.name);

  constructor(private readonly playerService: PlayerService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handlePlayerSync() {
    this.logger.log('Starting scheduled player sync...');

    try {
      await this.playerService.syncPlayers();
    } catch (error) {
      this.logger.error('Scheduled player sync failed:', error);
    }
  }

  async onApplicationBootstrap() {
    // this.logger.log('Running initial player sync on startup...');
    // this.handlePlayerSync();
  }
}
