import { ITwitchStream, ITwitchVod } from '@aoe4.fr/shared-types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchTwitchStreams(): Promise<ITwitchStream[]> {
  const response = await fetch(`${API_BASE}/twitch/streams`);
  if (!response.ok) throw new Error('Failed to fetch Twitch streams');
  return response.json() as Promise<ITwitchStream[]>;
}

export async function fetchTwitchVods(): Promise<ITwitchVod[]> {
  const response = await fetch(`${API_BASE}/twitch/vods`);
  if (!response.ok) throw new Error('Failed to fetch Twitch VODs');
  return response.json() as Promise<ITwitchVod[]>;
}
