import { useEffect, useState } from 'react';
import { ITwitchVod } from '@aoe4.fr/shared-types';
import { fetchTwitchVods } from './twitch.api';

export function useTwitchVods() {
  const [vods, setVods] = useState<ITwitchVod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTwitchVods()
      .then(setVods)
      .catch(() => setError('Impossible de charger les VODs Twitch'))
      .finally(() => setIsLoading(false));
  }, []);

  return { vods, isLoading, error };
}
