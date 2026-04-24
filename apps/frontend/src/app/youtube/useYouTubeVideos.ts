import { useEffect, useState } from 'react';
import { IYouTubeVideo } from '@aoe4.fr/shared-types';
import { fetchYouTubeVideos } from './youtube.api';

export function useYouTubeVideos() {
  const [videos, setVideos] = useState<IYouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchYouTubeVideos()
      .then(setVideos)
      .catch(() => setError('Impossible de charger les vidéos YouTube'))
      .finally(() => setIsLoading(false));
  }, []);

  return { videos, isLoading, error };
}
