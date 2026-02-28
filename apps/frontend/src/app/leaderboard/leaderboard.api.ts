import { ILeaderboardEntry } from '@ordreduwololo-nx/shared-types';

const API_BASE = 'http://localhost:3000';


export async function fetchLeaderboard(): Promise<ILeaderboardEntry[]> {
  const response = await fetch(`${API_BASE}/leaderboard`);
  return response.json() as Promise<ILeaderboardEntry[]>;
}
