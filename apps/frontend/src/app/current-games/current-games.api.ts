import { ICurrentGame } from '@ordreduwololo-nx/shared-types';

const API_BASE = 'http://localhost:3000';

export type CurrentGame = ICurrentGame;

export async function fetchCurrentGames(): Promise<CurrentGame[]> {
  const response = await fetch(`${API_BASE}/games/current-games`);
  return response.json() as Promise<CurrentGame[]>;
}

export function subscribeToCurrentGames(
  onUpdate: (games: CurrentGame[]) => void,
  onError: (err: Event) => void,
): EventSource {
  const source = new EventSource(`${API_BASE}/games/current-games/stream`);
  source.onmessage = (event) => {
    onUpdate(JSON.parse(event.data as string) as CurrentGame[]);
  };
  source.onerror = onError;
  return source;
}
