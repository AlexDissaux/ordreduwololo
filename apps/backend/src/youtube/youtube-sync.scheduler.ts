import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { YouTubeApiService } from './youtube-api.service';
import { YouTubeChannelRepository } from './youtube-channel.repository';

const INACTIVE_DAYS = 30;

@Injectable()
export class YouTubeSyncScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(YouTubeSyncScheduler.name);

  constructor(
    private readonly youtubeApiService: YouTubeApiService,
    private readonly youtubeChannelRepository: YouTubeChannelRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.syncChannels();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async syncChannels(): Promise<void> {
    try {
      const [lives, recent] = await Promise.all([
        this.youtubeApiService.fetchLiveStreams(),
        this.youtubeApiService.fetchRecentVideos(),
      ]);
      const allVideos = [...lives, ...recent];
      await this.youtubeChannelRepository.upsertChannels(allVideos);
      this.logger.log(`Synced YouTube channels from ${allVideos.length} videos`);
    } catch (err) {
      this.logger.error('Failed to sync YouTube channels', err);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async purgeInactiveChannels(): Promise<void> {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - INACTIVE_DAYS);
      const deleted = await this.youtubeChannelRepository.deleteInactive(cutoff);
      this.logger.log(`Purged ${deleted} inactive YouTube channels (inactive > ${INACTIVE_DAYS} days)`);
    } catch (err) {
      this.logger.error('Failed to purge inactive YouTube channels', err);
    }
  }
}
