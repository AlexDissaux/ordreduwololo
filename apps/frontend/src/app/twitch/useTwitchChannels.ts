import { useEffect, useState } from 'react';
import { ITwitchChannel } from '@aoe4.fr/shared-types';
import { fetchTwitchChannels } from './twitch.api';

export function useTwitchChannels() {
  const [channels, setChannels] = useState<ITwitchChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTwitchChannels()
      .then(setChannels)
      .catch(() => setError('Impossible de charger les chaînes Twitch'))
      .finally(() => setIsLoading(false));
  }, []);

  return { channels, isLoading, error };
}
