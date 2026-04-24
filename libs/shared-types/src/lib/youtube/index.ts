export interface IYouTubeVideo {
  id: string;
  channelId: string;
  channelTitle: string;
  title: string;
  publishedAt: string; // ISO date string
  thumbnailUrl: string;
  isLive: boolean;
  videoUrl: string;
}

export interface IYouTubeChannel {
  channelId: string;
  displayName: string;
  lastVideoAt: string; // ISO date string
}
