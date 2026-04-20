import { useEffect, useState } from 'react';
import { ITwitchStream } from '@aoe4.fr/shared-types';
import { fetchTwitchStreams } from './twitch.api';

export function useTwitchStreams() {
  const [streams, setStreams] = useState<ITwitchStream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTwitchStreams()
      .then(setStreams)
      .catch(() => setError('Impossible de charger les streams Twitch'))
      .finally(() => setIsLoading(false));
  }, []);

  return { streams, isLoading, error };
}
