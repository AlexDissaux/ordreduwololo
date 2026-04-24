import { IYouTubeChannel, IYouTubeVideo } from '@aoe4.fr/shared-types';
import { useYouTubeChannels } from './useYouTubeChannels';
import { useYouTubeVideos } from './useYouTubeVideos';

// YouTube logo SVG (red)
function YouTubeLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function formatRelativeDate(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'il y a moins d\'1h';
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'il y a 1 jour';
  return `il y a ${days} jours`;
}

function VideoCard({ video }: { video: IYouTubeVideo }) {
  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-red-700 transition-colors"
    >
      <div className="relative aspect-video bg-zinc-800 overflow-hidden">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
            Pas de miniature
          </div>
        )}
        {video.isLive && (
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
            LIVE
          </span>
        )}
        {!video.isLive && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            {formatRelativeDate(video.publishedAt)}
          </span>
        )}
      </div>
      <div className="px-3 py-2">
        <p className="text-sm font-semibold truncate">{video.channelTitle}</p>
        <p className="text-xs text-zinc-400 truncate mt-0.5">{video.title}</p>
      </div>
    </a>
  );
}

function ChannelRow({ channel }: { channel: IYouTubeChannel }) {
  return (
    <a
      href={`https://www.youtube.com/channel/${channel.channelId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 transition-colors"
    >
      <span className="text-red-500 shrink-0">
        <YouTubeLogo size={14} />
      </span>
      <span className="flex-1 text-sm font-medium text-zinc-300 truncate">
        {channel.displayName}
      </span>
      <span className="text-xs text-zinc-600 shrink-0">
        {formatRelativeDate(channel.lastVideoAt)}
      </span>
    </a>
  );
}

export function YouTubePage() {
  const { videos, isLoading: videosLoading } = useYouTubeVideos();
  const { channels, isLoading: channelsLoading } = useYouTubeChannels();

  const liveVideos = videos.filter((v) => v.isLive);
  const recentVideos = videos.filter((v) => !v.isLive);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">
          Communauté francophone
        </p>
        <h1 className="text-2xl font-bold tracking-tight uppercase">YouTube</h1>
        <div className="mt-2 h-px bg-linear-to-r from-red-500 to-transparent" />
      </div>

      {/* Live streams */}
      {liveVideos.length > 0 && (
        <section>
          <h2 className="text-base font-semibold uppercase tracking-widest text-red-500 mb-4">
            En direct
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {/* Recent videos */}
      <section>
        <h2 className="text-base font-semibold uppercase tracking-widest text-red-500 mb-4">
          Vidéos récentes
        </h2>
        {videosLoading ? (
          <div className="text-sm text-zinc-500">Chargement…</div>
        ) : recentVideos.length === 0 ? (
          <div className="text-sm text-zinc-500 italic">Aucune vidéo disponible.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>

      {/* Known channels */}
      <section>
        <h2 className="text-base font-semibold uppercase tracking-widest text-red-500 mb-4">
          Chaînes
        </h2>
        {channelsLoading ? (
          <div className="text-sm text-zinc-500">Chargement…</div>
        ) : channels.length === 0 ? (
          <div className="text-sm text-zinc-500 italic">Aucune chaîne connue pour l'instant.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {channels.map((ch) => (
              <ChannelRow key={ch.channelId} channel={ch} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
