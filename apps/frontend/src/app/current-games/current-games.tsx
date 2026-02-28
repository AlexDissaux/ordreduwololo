import { ICurrentGame, ICurrentGamePlayer } from '@ordreduwololo-nx/shared-types';
import { useCurrentGames } from './useCurrentGames';

export function CurrentGames() {
  const { games } = useCurrentGames();

  return (
    <div>
      {games.length === 0 && <p>Aucune partie en cours chez ODW pour le moment...</p>}

      {games.map((game: ICurrentGame, i) => (
        <div key={i}>
          <h3>{game.map} — {game.leaderboard}</h3>
          <div>
            {game.teams.map((team: ICurrentGamePlayer[], ti) => (
              <div key={ti}>
                {team.map((player: ICurrentGamePlayer, pi) => (
                  <span key={pi}>
                    {player.name} ({player.civilization}){player.rating ? ` ${player.rating}` : ''}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}