export interface SyncResult {
  added: number;
  updated: number;
  unchanged: number;
  total: number;
  syncedAt: string;
}

export interface Aoe4WorldPlayer {
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
  leaderboards: {
    rm_solo?: {
      rating: number;
      rank: number;
      rank_level: string;
      games_count: number;
      wins_count: number;
      losses_count: number;
      win_rate: number;
    };
    rm_team?: {
      rating: number;
      rank: number;
      rank_level: string;
      games_count: number;
      wins_count: number;
      losses_count: number;
      win_rate: number;
    };
  };
}

export interface Aoe4WorldResponse {
  total_count: number;
  page: number;
  per_page: number;
  count: number;
  players: Aoe4WorldPlayer[];
}
