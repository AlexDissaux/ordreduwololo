import { useState } from 'react';
import { useLeaderboard } from './useLeaderboard';
import { useLeaderboardTeam } from './useLeaderboardTeam';
import { LeaderboardTable } from './leaderboard';

type Tab = 'solo' | 'team';

export function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>('solo');
  const solo = useLeaderboard();
  const team = useLeaderboardTeam();

  const current = tab === 'solo' ? solo : team;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight uppercase">Classement</h1>
        <div className="mt-2 h-px bg-gradient-to-r from-amber-500 to-transparent" />
        <div className="mt-4 flex gap-1 p-1 bg-zinc-900 rounded-lg w-fit border border-zinc-800">
          {(['solo', 'team'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                tab === t ? 'bg-amber-500 text-zinc-900' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t === 'solo' ? 'Solo' : 'Équipes'}
            </button>
          ))}
        </div>
      </div>
      <LeaderboardTable players={current.players} isLoading={current.isLoading} />
    </div>
  );
}
