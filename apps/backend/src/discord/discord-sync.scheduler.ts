import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiscordApiService, FR_DISCORD_GUILD_IDS } from './discord-api.service';
import { DiscordServerRepository } from './discord-server.repository';
import { delay } from '../common/utils/delay.service';

@Injectable()
export class DiscordSyncScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(DiscordSyncScheduler.name);

  constructor(
    private readonly discordApiService: DiscordApiService,
    private readonly discordServerRepository: DiscordServerRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.syncServers();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async syncServers(): Promise<void> {
    if (FR_DISCORD_GUILD_IDS.length === 0) {
      return;
    }
    let synced = 0;
    for (const guildId of FR_DISCORD_GUILD_IDS) {
      const widget = await this.discordApiService.fetchGuildWidget(guildId);
      if (widget) {
        await this.discordServerRepository.upsertServer({
          guildId: widget.id,
          name: widget.name,
          inviteUrl: widget.instant_invite,
          onlineCount: widget.presence_count,
        });
        synced++;
      }
      await delay(500);
    }
    this.logger.log(`Synced ${synced}/${FR_DISCORD_GUILD_IDS.length} Discord servers`);
  }
}
