import { ICurrentGame, ICurrentGamePlayer } from '@aoe4.fr/shared-types';
import { useCurrentGames } from './useCurrentGames';
import styles from './current-games.module.css';
import { CIV_FLAG_URLS } from './civ-flags';

function formatLeaderboard(leaderboard: string): string {
  return leaderboard.replace(/_/g, ' ').toUpperCase();
}

function CivFlag({ civilization }: { civilization: string }) {
  const src = CIV_FLAG_URLS[civilization];
  if (!src) return null;
  return (
    <img
      className={styles.civFlag}
      src={src}
      alt={civilization}
      title={civilization}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

function CountryFlag({ country }: { country: string }) {
  if (!country) return null;
  return (
    <img
      className={styles.countryFlag}
      src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
      alt={country}
      title={country}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

function RatingCell({ player }: { player: ICurrentGamePlayer | undefined }) {
  if (!player) return <td className={styles.ratingCell} />;
  return (
    <td className={styles.ratingCell}>
      {player.rating != null ? (
        player.rating
      ) : (
        <span className={styles.ratingEmpty}>—</span>
      )}
    </td>
  );
}

export function CurrentGames() {
  const { games, isLoading } = useCurrentGames();

  if (isLoading) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <p className={styles.loading}>Chargement des parties en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <p className={styles.title}>Parties en cours</p>

        {games.length === 0 ? (
          <p className={styles.empty}>Aucune partie en cours pour le moment...</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Map / Mode</th>
                  <th>Joueur(s)</th>
                  <th className={styles.thRating}>Rating</th>
                  <th className={styles.thVs}>vs</th>
                  <th className={styles.thRating}>Rating</th>
                  <th style={{ textAlign: 'right' }}>Adversaire(s)</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game: ICurrentGame, gi) => {
                  const team1 = game.teams[0] ?? [];
                  const team2 = game.teams[1] ?? [];
                  const rowCount = Math.max(team1.length, team2.length);

                  return Array.from({ length: rowCount }).map((_, pi) => {
                    const p1: ICurrentGamePlayer | undefined = team1[pi];
                    const p2: ICurrentGamePlayer | undefined = team2[pi];

                    return (
                      <tr
                        key={`${gi}-${pi}`}
                        className={pi === 0 ? styles.gameFirstRow : styles.gameRow}
                      >
                        {pi === 0 && (
                          <td rowSpan={rowCount} className={styles.mapCell}>
                            <div className={styles.mapName}>{game.map}</div>
                            <div className={styles.mapMode}>{formatLeaderboard(game.leaderboard)}</div>
                          </td>
                        )}

                        <td className={styles.playerCell}>
                          {p1 && (
                            <div className={styles.playerInner}>
                              <CivFlag civilization={p1.civilization} />
                              <CountryFlag country={p1.country} />
                              <span className={styles.playerName}>{p1.name}</span>
                            </div>
                          )}
                        </td>

                        <RatingCell player={p1} />

                        {pi === 0 && (
                          <td rowSpan={rowCount} className={styles.vsCell}>vs</td>
                        )}

                        <RatingCell player={p2} />

                        <td className={styles.opponentCell}>
                          {p2 && (
                            <div className={styles.opponentInner}>
                              <span className={styles.opponentName}>{p2.name}</span>
                              <CountryFlag country={p2.country} />
                              <CivFlag civilization={p2.civilization} />
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
        )}
      </div>
    </div>
  );
}