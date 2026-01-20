// Example shared types between frontend and backend

export interface Player {
  id: string;
  name: string;
  score: number;
  teamId: string;
}

export interface Team {
  id: string;
  name: string;
  totalScore: number;
  players: Player[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
