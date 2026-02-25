import { useEffect, useState } from 'react';
import { fetchPlayers } from '../api/player.api';
import { Player } from '../types/player';

interface UsePlayersResult {
  players: Player[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePlayers(): UsePlayersResult {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setPlayers(await fetchPlayers());
    } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPlayers();
  }, []);

  return {
    players,
    isLoading,
    error,
    refetch: async () => {
      await loadPlayers();
    },
  };
}
