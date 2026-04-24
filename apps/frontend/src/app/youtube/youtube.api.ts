import { IYouTubeChannel, IYouTubeVideo } from '@aoe4.fr/shared-types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchYouTubeVideos(): Promise<IYouTubeVideo[]> {
  const response = await fetch(`${API_BASE}/youtube/videos`);
  if (!response.ok) throw new Error('Failed to fetch YouTube videos');
  return response.json() as Promise<IYouTubeVideo[]>;
}

export async function fetchYouTubeChannels(): Promise<IYouTubeChannel[]> {
  const response = await fetch(`${API_BASE}/youtube/channels`);
  if (!response.ok) throw new Error('Failed to fetch YouTube channels');
  return response.json() as Promise<IYouTubeChannel[]>;
}
