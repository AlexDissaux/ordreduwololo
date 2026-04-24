import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('youtube_channels')
export class YouTubeChannel {
  @PrimaryColumn({ name: 'channel_id', type: 'varchar' })
  channelId: string;

  @Column({ name: 'display_name', type: 'varchar' })
  displayName: string;

  @Column({ name: 'last_video_at', type: 'timestamp' })
  lastVideoAt: Date;
}
