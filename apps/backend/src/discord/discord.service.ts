import { Injectable, Logger } from '@nestjs/common';
import { IDiscordServer } from '@aoe4.fr/shared-types';
import { DiscordServerRepository } from './discord-server.repository';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);

  constructor(
    private readonly discordServerRepository: DiscordServerRepository,
  ) {}

  async getServers(): Promise<IDiscordServer[]> {
    const servers = await this.discordServerRepository.findAll();
    return servers.map((s) => ({
      guildId: s.guildId,
      name: s.name,
      inviteUrl: s.inviteUrl,
      onlineCount: s.onlineCount,
      lastSyncedAt: s.lastSyncedAt.toISOString(),
    }));
  }
}
