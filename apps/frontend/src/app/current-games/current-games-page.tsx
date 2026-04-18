import { useState } from 'react';
import { CurrentGames } from './current-games';

type Filter = 'all' | 'solo' | 'team';

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'solo', label: 'Solo' },
  { value: 'team', label: 'Équipes' },
];

export function CurrentGamesPage() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight uppercase">Qui joue ?</h1>
        <div className="mt-2 h-px bg-gradient-to-r from-amber-500 to-transparent" />
        <div className="mt-4 flex gap-1 p-1 bg-zinc-900 rounded-lg w-fit border border-zinc-800">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === f.value ? 'bg-amber-500 text-zinc-900' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <CurrentGames filter={filter} />
    </div>
  );
}
