// ===================================
// API Response Types
// ===================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===================================
// Player Types (AoE4 World API)
// ===================================

export interface IPlayerAvatars {
  small: string | null;
  medium: string | null;
  full: string | null;
}

export interface IPlayerSocial {
  twitchUrl: string | null;
  youtubeUrl: string | null;
}

export interface IRankedStats {
  rating: number | null;
  rank: number | null;
  rankLevel: string | null;
  gamesCount: number | null;
  winsCount: number | null;
  lossesCount: number | null;
  winRate: number | null;
}

export interface IPlayer {
  profileId: number;
  name: string;
  steamId: string | null;
  country: string | null;
  avatars: IPlayerAvatars;
  social: IPlayerSocial;
  lastGameAt: string | null;
  rmSolo: IRankedStats;
  rmTeam: IRankedStats;
  createdAt: string;
  updatedAt: string;
}

// Flat version matching database entity (for internal use)
export interface IPlayerFlat {
  profileId: number;
  name: string;
  steamId: string | null;
  country: string | null;
  avatarSmall: string | null;
  avatarMedium: string | null;
  avatarFull: string | null;
  twitchUrl: string | null;
  youtubeUrl: string | null;
  lastGameAt: string | null;
  rmSoloRating: number | null;
  rmSoloRank: number | null;
  rmSoloRankLevel: string | null;
  rmSoloGamesCount: number | null;
  rmSoloWinsCount: number | null;
  rmSoloLossesCount: number | null;
  rmSoloWinRate: number | null;
  rmTeamRating: number | null;
  rmTeamRank: number | null;
  rmTeamRankLevel: string | null;
  rmTeamGamesCount: number | null;
  rmTeamWinsCount: number | null;
  rmTeamLossesCount: number | null;
  rmTeamWinRate: number | null;
  createdAt: string;
  updatedAt: string;
}

// ===================================
// Leaderboard Types
// ===================================

export interface ILeaderboardEntry {
  rank: number;
  profileId: number;
  name: string;
  country: string | null;
  rating: number;
  rankLevel: string;
  gamesCount: number;
  winRate: number;
}

// ===================================
// Sync Status Types
// ===================================

export interface ISyncResult {
  added: number;
  updated: number;
  unchanged: number;
  total: number;
  syncedAt: string;
}
