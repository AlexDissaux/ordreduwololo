export interface IDiscordServer {
  guildId: string;
  name: string;
  inviteUrl: string | null;
  onlineCount: number;
  lastSyncedAt: string; // ISO date string
}
