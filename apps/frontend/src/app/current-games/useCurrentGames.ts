import { useState, useEffect } from 'react';
import { subscribeToCurrentGames, CurrentGame } from './current-games.api';

interface UseCurrentGamesResult {
  games: CurrentGame[];
  isLoading: boolean;
  error: string | null;
}

export function useCurrentGames(): UseCurrentGamesResult {
  const [games, setGames] = useState<CurrentGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = subscribeToCurrentGames(
      (data) => {
        setGames(data);
        setIsLoading(false);
        console.log('Received current games update:', data);
      },
      () => setError('Lost connection to server'),
    );

    return () => source.close();
  }, []);

  return { games, isLoading, error };
}
