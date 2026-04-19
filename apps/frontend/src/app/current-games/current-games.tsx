import { CivFlag } from '@aoe4.fr/ui';
import { ICurrentGame, ICurrentGamePlayer } from '@aoe4.fr/shared-types';
import { useCurrentGames } from './useCurrentGames';

type Filter = 'all' | 'solo' | 'team';

function formatLeaderboard(leaderboard: string): string {
  return leaderboard.replace(/_/g, ' ').toUpperCase();
}

function CountryFlag({ country }: { country: string }) {
  if (!country) return null;
  return (
    <img
      className="w-5 h-auto flex-shrink-0"
      src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
      alt={country}
      title={country}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

function RatingCell({ player, civSide = 'left' }: { player: ICurrentGamePlayer | undefined; civSide?: 'left' | 'right' }) {
  if (!player) return <td className="py-3 text-center font-mono text-sm w-24" />;
  const rating = (
    <span className={`inline-block w-12 font-mono text-sm ${civSide === 'left' ? 'text-right' : 'text-left'} ${player.rating != null ? 'text-amber-400' : 'text-zinc-600'}`}>
      {player.rating ?? '—'}
    </span>
  );
  return (
    <td className="py-3 w-24">
      <div className="flex items-center justify-center gap-1.5">
        {civSide === 'left' && (
          <CivFlag civilization={player.civilization} className="w-7 h-auto rounded-sm flex-shrink-0 object-cover" />
        )}
        {rating}
        {civSide === 'right' && (
          <CivFlag civilization={player.civilization} className="w-7 h-auto rounded-sm flex-shrink-0 object-cover" />
        )}
      </div>
    </td>
  );
}

interface Props {
  filter?: Filter;
}

export function CurrentGames({ filter = 'all' }: Props) {
  const { games, isLoading } = useCurrentGames();

  const filteredGames =
    filter === 'all'
      ? games
      : games.filter((g) => g.leaderboard === (filter === 'solo' ? 'rm_solo' : 'rm_team'));

  if (isLoading) {
    return <div className="py-16 text-center text-zinc-500">Chargement des parties en cours…</div>;
  }

  if (filteredGames.length === 0) {
    return <div className="py-16 text-center text-zinc-500 italic">Aucune partie en cours…</div>;
  }

  return (
    <div className="overflow-x-auto overflow-hidden rounded-lg border border-zinc-800">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-zinc-900 text-xs uppercase tracking-widest text-zinc-400">
            <th className="px-4 py-3 text-left min-w-[9rem]">Map / Mode</th>
            <th className="px-4 py-3 text-left">Joueur(s)</th>
            <th className="py-3 text-center w-24">Rating</th>
            <th className="px-3 py-3 text-center w-10">vs</th>
            <th className="py-3 text-center w-24">Rating</th>
            <th className="px-4 py-3 text-right">Adversaire(s)</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game: ICurrentGame, gi) => {
            const team1 = game.teams[0] ?? [];
            const team2 = game.teams[1] ?? [];
            const rowCount = Math.max(team1.length, team2.length);

            return Array.from({ length: rowCount }).map((_, pi) => {
              const p1: ICurrentGamePlayer | undefined = team1[pi];
              const p2: ICurrentGamePlayer | undefined = team2[pi];

              return (
                <tr
                  key={`${gi}-${pi}`}
                  className={`bg-zinc-900 hover:bg-zinc-800 transition-colors ${
                    pi === 0 ? 'border-t-2 border-amber-900/30' : 'border-t border-zinc-800'
                  }`}
                >
                  {pi === 0 && (
                    <td rowSpan={rowCount} className="px-4 py-3 align-middle border-r border-zinc-800">
                      <div className="font-semibold text-amber-300 truncate">{game.map}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{formatLeaderboard(game.leaderboard)}</div>
                    </td>
                  )}

                  <td className="px-4 py-3">
                    {p1 && (
                      <div className="flex items-center gap-1.5">
                        <CountryFlag country={p1.country} />
                        <span className="font-medium truncate">{p1.name}</span>
                      </div>
                    )}
                  </td>

                  <RatingCell player={p1} civSide="left" />

                  {pi === 0 && (
                    <td rowSpan={rowCount} className="px-3 py-3 text-center font-bold text-zinc-600 align-middle">
                      vs
                    </td>
                  )}

                  <RatingCell player={p2} civSide="right" />

                  <td className="px-4 py-3">
                    {p2 && (
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="font-medium truncate">{p2.name}</span>
                        <CountryFlag country={p2.country} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}
