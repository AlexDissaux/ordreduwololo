import { useState, useEffect } from 'react';
import { subscribeToCurrentGames } from './current-games.api';
import { CurrentGame } from 'libs/shared-types/src';

interface UseCurrentGamesResult {
  games: CurrentGame[];
  isLoading: boolean;
  error: string | null;
}

function maxRating(game: CurrentGame): number {
  return Math.max(0, ...game.teams.flat().map((p) => p.rating ?? 0));
}

function compareGames(a: CurrentGame, b: CurrentGame): number {
  // const modeOrder = ['qm_4v4', 'qm_3v3', 'qm_2v2', 'rm_team', 'qm_1v1', 'rm_solo'];
  // const modeDiff = modeOrder.indexOf(b.leadserboard) - modeOrder.indexOf(a.leaderboard);
  // if (modeDiff !== 0) return modeDiff;
  return maxRating(b) - maxRating(a);
}

export function useCurrentGames(): UseCurrentGamesResult {
  const [games, setGames] = useState<CurrentGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = subscribeToCurrentGames(
      (data) => {
        setGames(data.sort(compareGames));
        setIsLoading(false);
        console.log('Received current games update:', data);
      },
      () => setError('Lost connection to server'),
    );

    return () => source.close();
  }, []);

  return { games, isLoading, error };
}
