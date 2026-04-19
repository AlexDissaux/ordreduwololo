import { CurrentGame } from '@aoe4.fr/shared-types';

const API_BASE = 'http://localhost:3000';


export async function fetchCurrentGames(): Promise<CurrentGame[]> {
  const response = await fetch(`${API_BASE}/current-games`);
  return response.json() as Promise<CurrentGame[]>;
}

export function subscribeToCurrentGames(
  onUpdate: (games: CurrentGame[]) => void,
  onError: (err: Event) => void,
): EventSource {
  const source = new EventSource(`${API_BASE}/current-games/stream`);
  source.onmessage = (event) => {
    onUpdate(JSON.parse(event.data as string) as CurrentGame[]);
  };
  source.onerror = onError;
  return source;
}
