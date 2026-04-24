import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { IYouTubeVideo } from '@aoe4.fr/shared-types';
import { YouTubeChannel } from './entities/youtube-channel.entity';

@Injectable()
export class YouTubeChannelRepository {
  constructor(
    @InjectRepository(YouTubeChannel)
    private readonly repo: Repository<YouTubeChannel>,
  ) {}

  async upsertChannels(videos: IYouTubeVideo[]): Promise<void> {
    if (videos.length === 0) return;
    const seen = new Map<string, { channelId: string; displayName: string }>();
    for (const v of videos) {
      seen.set(v.channelId, { channelId: v.channelId, displayName: v.channelTitle });
    }
    const channels = [...seen.values()].map((c) => ({
      channelId: c.channelId,
      displayName: c.displayName,
      lastVideoAt: new Date(),
    }));
    await this.repo.upsert(channels, ['channelId']);
  }

  async findAll(): Promise<YouTubeChannel[]> {
    return this.repo.find({ order: { displayName: 'ASC' } });
  }

  async deleteInactive(cutoffDate: Date): Promise<number> {
    const result = await this.repo.delete({ lastVideoAt: LessThan(cutoffDate) });
    return result.affected ?? 0;
  }
}
