import { ICurrentGame } from '@ordreduwololo-nx/shared-types';

const API_BASE = 'http://localhost:3000';

export type CurrentGame = ICurrentGame;

export async function fetchCurrentGames(): Promise<CurrentGame[]> {
  const response = await fetch(`${API_BASE}/games/current-games`);
  return response.json() as Promise<CurrentGame[]>;
}
