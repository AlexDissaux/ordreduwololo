import { Player } from '../types/player';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchPlayers(): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/players`);

  if (!response.ok) {
    throw new Error(`Failed to fetch players: ${response.status}`);
  }

  return (await response.json()) as Player[];
}
