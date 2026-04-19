import { Link } from 'react-router-dom';
import { useCurrentGames } from './useCurrentGames';

export function CurrentGamesPreview() {
  const { games, isLoading } = useCurrentGames();

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">⚔️ Qui joue ?</span>
        <Link to="/en-jeu" className="text-xs text-zinc-400 hover:text-white transition-colors">Voir tout →</Link>
      </div>
      {isLoading ? (
        <div className="px-4 py-6 text-sm text-zinc-500">Chargement…</div>
      ) : games.length === 0 ? (
        <div className="px-4 py-6 text-sm text-zinc-500 italic">Aucune partie en cours…</div>
      ) : (
        <ul>
          {games.slice(0, 4).map((game, i) => {
            const team1 = game.teams[0]?.map((p) => p.name).join(' & ') ?? '—';
            const team2 = game.teams[1]?.map((p) => p.name).join(' & ') ?? '—';
            return (
              <li key={i} className="px-4 py-2.5 border-t border-zinc-800 hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex-1 truncate font-medium">{team1}</span>
                  <span className="text-xs text-zinc-600 shrink-0">vs</span>
                  <span className="flex-1 truncate font-medium text-right">{team2}</span>
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{game.map}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
