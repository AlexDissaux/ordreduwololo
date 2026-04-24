import { Injectable, Logger } from '@nestjs/common';
import { IYouTubeChannel, IYouTubeVideo } from '@aoe4.fr/shared-types';
import { YouTubeApiService } from './youtube-api.service';
import { YouTubeChannelRepository } from './youtube-channel.repository';

const VIDEOS_TTL = 15 * 60 * 1000; // 15 minutes

@Injectable()
export class YouTubeService {
  private readonly logger = new Logger(YouTubeService.name);

  private cachedVideos: IYouTubeVideo[] = [];
  private videosLastFetched = 0;

  constructor(
    private readonly youtubeApiService: YouTubeApiService,
    private readonly youtubeChannelRepository: YouTubeChannelRepository,
  ) {}

  async getVideos(): Promise<IYouTubeVideo[]> {
    if (Date.now() - this.videosLastFetched < VIDEOS_TTL) {
      return this.cachedVideos;
    }
    try {
      const [lives, recent] = await Promise.all([
        this.youtubeApiService.fetchLiveStreams(),
        this.youtubeApiService.fetchRecentVideos(),
      ]);
      // Deduplicate: live streams first, then recent videos (excluding already-present live ids)
      const liveIds = new Set(lives.map((v) => v.id));
      const deduped = [...lives, ...recent.filter((v) => !liveIds.has(v.id))];
      this.cachedVideos = deduped;
      this.videosLastFetched = Date.now();
    } catch (err) {
      this.logger.error('Failed to fetch YouTube videos', err);
    }
    return this.cachedVideos;
  }

  async getChannels(): Promise<IYouTubeChannel[]> {
    const channels = await this.youtubeChannelRepository.findAll();
    return channels.map((c) => ({
      channelId: c.channelId,
      displayName: c.displayName,
      lastVideoAt: c.lastVideoAt.toISOString(),
    }));
  }
}
