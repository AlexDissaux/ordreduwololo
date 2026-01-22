import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { PlayerService } from '../player';

@Injectable()
export class PlayerSyncScheduler {
  private readonly logger = new Logger(PlayerSyncScheduler.name);

  constructor(private readonly playerService: PlayerService) {}

  /**
   * Sync players from aoe4world API every hour
   * This will check for new players and update existing ones
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handlePlayerSync() {
    this.logger.log('Starting scheduled player sync...');

    try {
      const result = await this.playerService.syncPlayers();
      this.logger.log(
        `Scheduled sync complete: ${result.added} added, ${result.updated} updated, ${result.unchanged} unchanged`,
      );
    } catch (error) {
      this.logger.error('Scheduled player sync failed:', error);
    }
  }

  /**
   * Run sync on application startup (after 10 seconds delay to let app initialize)
   */
  @Timeout(10000)
  async handleInitialSync() {
    this.logger.log('Running initial player sync on startup...');
    await this.handlePlayerSync();
  }
}
