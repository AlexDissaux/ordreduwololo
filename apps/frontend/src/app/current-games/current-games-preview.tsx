import { Link } from 'react-router-dom';
import { RankIcon } from '@aoe4.fr/ui';
import { useCurrentGames } from './useCurrentGames';

function formatLeaderboard(leaderboard: string): string {
  return leaderboard.replace(/_/g, ' ').toUpperCase();
}

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
        <ul className="overflow-y-auto max-h-[280px]">
          {games.slice(0, 25).map((game, i) => {
            const team1 = game.teams[0] ?? [];
            return (
              <li key={i} className="px-4 py-2.5 border-t border-zinc-800 hover:bg-zinc-800 transition-colors">
                <div className="space-y-0.5">
                  {team1.map((p, pi) => (
                    <div key={pi} className="flex items-center gap-1.5 text-sm min-w-0">
                      {p.country && (
                        <img
                          className="w-4 h-auto flex-shrink-0"
                          src={`https://flagcdn.com/w40/${p.country.toLowerCase()}.png`}
                          alt={p.country}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <span className="font-medium truncate">{p.name}</span>
                      <RankIcon rankLevel={p.rank_level} size={16} className="ml-auto flex-shrink-0" />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-zinc-600 mt-0.5">
                  <span>{formatLeaderboard(game.leaderboard)}</span>
                  <span className="mx-1">·</span>
                  <span>{game.map}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

