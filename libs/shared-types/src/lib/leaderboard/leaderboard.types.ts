export interface ILeaderboardEntry {
  id: number;
  name: string;
  rm_solo_rating: number | null;
  rm_solo_rank_level: string | null;
  rm_solo_games_count: number | null;
  rm_solo_wins_count: number | null;
  rm_solo_losses_count: number | null;
}
