import { useState, useEffect, useCallback } from 'react';
import { fetchLeaderboardTeam } from './leaderboard.api';
import { PLayerLeaderboard } from '@aoe4.fr/shared-types';

export function useLeaderboardTeam() {
  const [players, setPlayers] = useState<PLayerLeaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeaderboardTeam();
      setPlayers(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { players, isLoading };
}
