import { useState, useEffect, useCallback } from 'react';
import { fetchCurrentGames, CurrentGame } from './current-games.api';

interface UseCurrentGamesResult {
  games: CurrentGame[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCurrentGames(): UseCurrentGamesResult {
  const [games, setGames] = useState<CurrentGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentGames();
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { games, isLoading, error, refetch: load };
}
