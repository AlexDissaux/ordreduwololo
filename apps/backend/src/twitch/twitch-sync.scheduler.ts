import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OnApplicationBootstrap } from '@nestjs/common';
import { TwitchApiService } from './twitch-api.service';
import { TwitchChannelRepository } from './twitch-channel.repository';

const INACTIVE_DAYS = 30;

@Injectable()
export class TwitchSyncScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(TwitchSyncScheduler.name);

  constructor(
    private readonly twitchApiService: TwitchApiService,
    private readonly twitchChannelRepository: TwitchChannelRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.syncLiveChannels();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncLiveChannels(): Promise<void> {
    try {
      const streams = await this.twitchApiService.fetchLiveStreams();
      await this.twitchChannelRepository.upsertChannels(streams);
      this.logger.log(`Synced ${streams.length} live Twitch channels`);
    } catch (err) {
      this.logger.error('Failed to sync live Twitch channels', err);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async purgeInactiveChannels(): Promise<void> {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - INACTIVE_DAYS);
      const deleted = await this.twitchChannelRepository.deleteInactive(cutoff);
      this.logger.log(`Purged ${deleted} inactive Twitch channels (inactive > ${INACTIVE_DAYS} days)`);
    } catch (err) {
      this.logger.error('Failed to purge inactive Twitch channels', err);
    }
  }
}
