import { PLayerLeaderboard } from '@aoe4.fr/shared-types';

const API_BASE = 'http://localhost:3000';

export async function fetchLeaderboard(): Promise<PLayerLeaderboard[]> {
  const response = await fetch(`${API_BASE}/leaderboard`);
  return response.json() as Promise<PLayerLeaderboard[]>;
}

export async function fetchLeaderboardTeam(): Promise<PLayerLeaderboard[]> {
  const response = await fetch(`${API_BASE}/leaderboard/team`);
  return response.json() as Promise<PLayerLeaderboard[]>;
}
