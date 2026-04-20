import { useTwitchStreams } from './useTwitchStreams';
import { useTwitchVods } from './useTwitchVods';
import { FRENCH_AOE4_CHANNELS } from './twitch-channels';
import { ITwitchStream, ITwitchVod } from '@aoe4.fr/shared-types';

function formatViewerCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function formatDuration(duration: string): string {
  // Twitch format: "1h23m45s" or "45m12s" or "12s"
  return duration.replace('h', 'h ').replace('m', 'm ').replace('s', 's').trim();
}

function StreamCard({ stream }: { stream: ITwitchStream }) {
  const thumb = stream.thumbnail_url
    .replace('{width}', '320')
    .replace('{height}', '180');

  return (
    <a
      href={`https://www.twitch.tv/${stream.user_login}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-purple-700 transition-colors"
    >
      <div className="relative aspect-video bg-zinc-800 overflow-hidden">
        <img
          src={thumb}
          alt={stream.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          LIVE
        </span>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
          {formatViewerCount(stream.viewer_count)} spectateurs
        </span>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm font-semibold truncate">{stream.user_name}</p>
        <p className="text-xs text-zinc-400 truncate mt-0.5">{stream.title}</p>
      </div>
    </a>
  );
}

function VodCard({ vod }: { vod: ITwitchVod }) {
  const thumb = vod.thumbnail_url
    .replace('%{width}', '320')
    .replace('%{height}', '180');

  const hasThumb = thumb && !thumb.includes('404');

  return (
    <a
      href={vod.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-purple-700 transition-colors"
    >
      <div className="relative aspect-video bg-zinc-800 overflow-hidden">
        {hasThumb ? (
          <img
            src={thumb}
            alt={vod.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
            Pas de miniature
          </div>
        )}
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(vod.duration)}
        </span>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm font-semibold truncate">{vod.user_name}</p>
        <p className="text-xs text-zinc-400 truncate mt-0.5">{vod.title}</p>
      </div>
    </a>
  );
}

function ChannelRow({
  login,
  displayName,
  liveStream,
}: {
  login: string;
  displayName: string;
  liveStream: ITwitchStream | undefined;
}) {
  const isLive = !!liveStream;

  return (
    <a
      href={`https://www.twitch.tv/${login}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-colors ${
        isLive
          ? 'border-purple-800 bg-zinc-900 hover:border-purple-500'
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 ${isLive ? 'bg-red-500' : 'bg-zinc-600'}`}
      />
      <span className={`flex-1 text-sm font-medium ${isLive ? 'text-white' : 'text-zinc-500'}`}>
        {liveStream?.user_name ?? displayName}
      </span>
      {isLive && liveStream ? (
        <span className="text-xs text-red-400 shrink-0">
          {formatViewerCount(liveStream.viewer_count)} spectateurs
        </span>
      ) : (
        <span className="text-xs text-zinc-600 shrink-0">hors ligne</span>
      )}
    </a>
  );
}

export function TwitchPage() {
  const { streams, isLoading: streamsLoading } = useTwitchStreams();
  const { vods, isLoading: vodsLoading } = useTwitchVods();

  const liveByLogin = new Map(streams.map((s) => [s.user_login.toLowerCase(), s]));

  // Extra live streams not in the static list
  const knownLogins = new Set(FRENCH_AOE4_CHANNELS.map((c) => c.login.toLowerCase()));
  const extraStreams = streams.filter((s) => !knownLogins.has(s.user_login.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
          Communauté francophone
        </p>
        <h1 className="text-2xl font-bold tracking-tight uppercase">Twitch</h1>
        <div className="mt-2 h-px bg-gradient-to-r from-purple-500 to-transparent" />
      </div>

      {/* Live streams section */}
      <section>
        <h2 className="text-base font-semibold uppercase tracking-widest text-purple-400 mb-4">
          En direct
        </h2>
        {streamsLoading ? (
          <div className="text-sm text-zinc-500">Chargement…</div>
        ) : streams.length === 0 ? (
          <div className="text-sm text-zinc-500 italic">Aucune chaîne en live pour l'instant.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        )}
      </section>

      {/* Known channels list */}
      <section>
        <h2 className="text-base font-semibold uppercase tracking-widest text-purple-400 mb-4">
          Chaînes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {FRENCH_AOE4_CHANNELS.map((ch) => (
            <ChannelRow
              key={ch.login}
              login={ch.login}
              displayName={ch.displayName}
              liveStream={liveByLogin.get(ch.login.toLowerCase())}
            />
          ))}
          {/* Extra live channels not in the static list */}
          {extraStreams.map((s) => (
            <ChannelRow
              key={s.user_login}
              login={s.user_login}
              displayName={s.user_name}
              liveStream={s}
            />
          ))}
        </div>
      </section>

      {/* VODs section */}
      <section>
        <h2 className="text-base font-semibold uppercase tracking-widest text-purple-400 mb-4">
          VODs récentes
        </h2>
        {vodsLoading ? (
          <div className="text-sm text-zinc-500">Chargement…</div>
        ) : vods.length === 0 ? (
          <div className="text-sm text-zinc-500 italic">Aucune VOD disponible.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {vods.map((vod) => (
              <VodCard key={vod.id} vod={vod} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
