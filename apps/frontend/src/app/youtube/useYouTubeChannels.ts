import { useEffect, useState } from 'react';
import { IYouTubeChannel } from '@aoe4.fr/shared-types';
import { fetchYouTubeChannels } from './youtube.api';

export function useYouTubeChannels() {
  const [channels, setChannels] = useState<IYouTubeChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchYouTubeChannels()
      .then(setChannels)
      .catch(() => setError('Impossible de charger les chaînes YouTube'))
      .finally(() => setIsLoading(false));
  }, []);

  return { channels, isLoading, error };
}
