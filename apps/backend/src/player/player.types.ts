export interface SyncResult {
  added: number;
  updated: number;
  unchanged: number;
  total: number;
  syncedAt: string;
}

export interface LeaderboardPlayerStats {
  rating: number;
  rank: number;
  rank_level: string;
  games_count: number;
  wins_count: number;
  losses_count: number;
  win_rate: number;
}

export interface Aoe4WorldLeaderboardPlayer extends LeaderboardPlayerStats {
  profile_id: number;
  name: string;
  steam_id: string;
  country: string;
  avatars: {
    small: string | null;
    medium: string | null;
    full: string | null;
  };
  social: {
    twitch?: string;
    youtube?: string;
  };
  last_game_at: string;
}

export interface Aoe4WorldLeaderboardResponse {
  total_count: number;
  page: number;
  per_page: number;
  count: number;
  players: Aoe4WorldLeaderboardPlayer[];
}

export const FRENCH_SPEAKING_COUNTRIES = ['fr', 'be', 'lu'] as const;

export const LEADERBOARDS = ['rm_solo', 'rm_team'] as const;
export type LeaderboardType = typeof LEADERBOARDS[number];

export interface MergedPlayer {
  profile_id: number;
  name: string;
  steam_id: string;
  country: string;
  social: {
    twitch?: string;
    youtube?: string;
  };
  last_game_at: string;
  rm_solo?: LeaderboardPlayerStats;
  rm_team?: LeaderboardPlayerStats;
}
