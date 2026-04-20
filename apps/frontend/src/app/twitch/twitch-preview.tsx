import { Link } from 'react-router-dom';
import { ITwitchStream } from '@aoe4.fr/shared-types';
import { useTwitchStreams } from './useTwitchStreams';

// Official Twitch logo SVG (purple)
function TwitchLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
    </svg>
  );
}

function formatViewerCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function StreamRow({ stream }: { stream: ITwitchStream }) {
  return (
    <li>
      <a
        href={`https://www.twitch.tv/${stream.user_login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 px-4 py-3 relative overflow-hidden transition-all duration-200
          bg-gradient-to-r from-purple-950/60 via-violet-900/30 to-transparent
          hover:from-purple-800/70 hover:via-violet-700/40
          border-b border-purple-900/40 last:border-0"
      >
        {/* left accent bar */}
        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-violet-600 opacity-80" />

        {/* Twitch logo */}
        <span className="text-purple-400 group-hover:text-purple-300 transition-colors shrink-0">
          <TwitchLogo size={15} />
        </span>

        {/* Streamer name + title */}
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-bold text-white truncate group-hover:text-purple-200 transition-colors">
            {stream.user_name}
          </span>
          <span className="block text-xs text-purple-300/70 truncate">{stream.title}</span>
        </span>

        {/* Live badge + viewer count */}
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="flex items-center gap-1 bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
            LIVE
          </span>
          <span className="text-xs text-purple-300 font-medium">
            {formatViewerCount(stream.viewer_count)}
          </span>
        </span>
      </a>
    </li>
  );
}

export function TwitchPreview() {
  const { streams, isLoading } = useTwitchStreams();
  const preview = streams.slice(0, 4);

  return (
    <div className="rounded-xl overflow-hidden border border-purple-900/60
      bg-gradient-to-br from-zinc-900 via-purple-950/20 to-zinc-900
      shadow-lg shadow-purple-950/30 col-span-full">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3
        bg-gradient-to-r from-purple-900/50 to-transparent
        border-b border-purple-900/40">
        <div className="flex items-center gap-2">
          <span className="text-purple-400">
            <TwitchLogo size={16} />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
            Twitch Live
          </span>
        </div>
        <Link
          to="/twitch"
          className="text-xs text-purple-400 hover:text-purple-200 font-medium transition-colors"
        >
          Voir tout →
        </Link>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="px-4 py-6 text-sm text-zinc-500">Chargement…</div>
      ) : preview.length === 0 ? (
        <div className="px-4 py-5 flex items-center gap-3 text-sm text-zinc-500 italic">
          <span className="text-zinc-600"><TwitchLogo size={14} /></span>
          Aucune chaîne en live pour l'instant.
        </div>
      ) : (
        <ul className="divide-y-0">
          {preview.map((stream) => (
            <StreamRow key={stream.id} stream={stream} />
          ))}
        </ul>
      )}
    </div>
  );
}
