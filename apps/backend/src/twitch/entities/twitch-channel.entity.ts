import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('twitch_channels')
export class TwitchChannel {
  @PrimaryColumn({ name: 'login', type: 'varchar' })
  login: string;

  @Column({ name: 'display_name', type: 'varchar' })
  displayName: string;

  @Column({ name: 'last_seen_live_at', type: 'timestamp' })
  lastSeenLiveAt: Date;
}
