

import { RankIcon } from '@aoe4.fr/ui';
import styles from './leaderboard.module.css';
import { useLeaderboard } from './useLeaderboard';

export function Leaderboard() {
  const { players } = useLeaderboard();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {players.length === 0 && <p>Chargement du classement...</p>}

        {players.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Name</th>
                  <th>Solo Rating</th>
                  <th>Solo Rank</th>
                  <th>W / L</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id} className={styles.tableRow}>
                    <td>{player.name}</td>
                    <td>{player.rm_solo_rating ?? '-'}</td>
                    <td><RankIcon rankLevel={player.rm_solo_rank_level} size={28} /></td>
                    <td>{player.rm_solo_wins_count ?? '-'} / {player.rm_solo_losses_count ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}