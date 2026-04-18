

import { RankIcon } from '@aoe4.fr/ui';
import { useLeaderboard } from './useLeaderboard';

export function Leaderboard() {
  const { players, isLoading } = useLeaderboard();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight uppercase">Classement Solo</h1>
        <div className="mt-2 h-px bg-gradient-to-r from-amber-500 to-transparent" />
      </div>

      {isLoading && (
        <div className="py-16 text-center text-zinc-500">Chargement du classement…</div>
      )}

      {!isLoading && players.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-zinc-800">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-900 text-xs uppercase tracking-widest text-zinc-400">
                <th className="w-12 px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Joueur</th>
                <th className="px-4 py-3 text-center">Rang</th>
                <th className="px-4 py-3 text-center">Score</th>
                <th className="px-4 py-3 text-center">V / D</th>
                <th className="px-4 py-3 text-center">Win rate</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => {
                const wins = player.rm_solo_wins_count ?? 0;
                const losses = player.rm_solo_losses_count ?? 0;
                const total = wins + losses;
                const winRate = total > 0 ? Math.round((wins / total) * 100) : null;

                return (
                  <tr
                    key={player.id}
                    className="border-t border-zinc-800 bg-zinc-900 transition-colors hover:bg-zinc-800"
                  >
                    <td className="px-4 py-3 text-center font-mono text-sm text-zinc-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium">{player.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <RankIcon rankLevel={player.rm_solo_rank_level} size={28} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-semibold text-amber-400">
                      {player.rm_solo_rating ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-emerald-400">{wins}</span>
                      <span className="mx-1 text-zinc-600">/</span>
                      <span className="text-red-400">{losses}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono">
                      {winRate !== null ? (
                        <span className="text-slate-300">{winRate}%</span>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
