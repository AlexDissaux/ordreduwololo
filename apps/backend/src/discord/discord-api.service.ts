import { Injectable, Logger } from '@nestjs/common';

const DISCORD_WIDGET_BASE = 'https://discord.com/api/guilds';

export interface DiscordWidgetResponse {
  id: string;
  name: string;
  instant_invite: string | null;
  presence_count: number;
}

/**
 * Guild IDs of French-speaking AoE4 Discord servers.
 * Each guild must have the Discord widget enabled (Server Settings → Widget).
 */
export const FR_DISCORD_GUILD_IDS: string[] = [
    '1246525062169755778', // ODW
    '981172285950017546', // ODG
    '1080504576328880148', // AOE4 Communauté FR
    '438693771065163776', // Age of empires France
    '585165441790509094', // Age of Empires Officials
  // Add French-speaking AoE4 Discord guild IDs here
  // Example: '123456789012345678',
];

@Injectable()
export class DiscordApiService {
  private readonly logger = new Logger(DiscordApiService.name);

  async fetchGuildWidget(guildId: string): Promise<DiscordWidgetResponse | null> {
    try {
      const res = await fetch(`${DISCORD_WIDGET_BASE}/${guildId}/widget.json`);
      if (!res.ok) {
        this.logger.warn(`Discord widget unavailable for guild ${guildId}: ${res.status}`);
        return null;
      }
      return res.json() as Promise<DiscordWidgetResponse>;
    } catch (err) {
      this.logger.error(`Failed to fetch Discord widget for guild ${guildId}`, err);
      return null;
    }
  }
}
