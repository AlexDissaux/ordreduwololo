import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('discord_servers')
export class DiscordServer {
  @PrimaryColumn({ name: 'guild_id', type: 'varchar' })
  guildId: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'invite_url', type: 'varchar', nullable: true })
  inviteUrl: string | null;

  @Column({ name: 'online_count', type: 'int', default: 0 })
  onlineCount: number;

  @Column({ name: 'last_synced_at', type: 'timestamp' })
  lastSyncedAt: Date;
}
