import { useState, useEffect, useCallback } from 'react';
import { fetchLeaderboard, LeaderboardEntry } from './leaderboard.api';

interface UseLeaderboardResult {
  players: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLeaderboard(): UseLeaderboardResult {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchLeaderboard();
      setPlayers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { players, isLoading, error, refetch: load };
}
