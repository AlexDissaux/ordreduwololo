import { Player } from '../player/entities';
import { LeaderboardDto } from './leaderboard.dto';

export function mapPlayersToLeaderboardDto(players: Player[]): LeaderboardDto[] {
  return players.map((player) => ({
    id: player.profileId,
    name: player.name,
    rm_solo_rating: player.rmSoloRating,
    rm_solo_rank_level: player.rmSoloRankLevel,
    rm_solo_games_count: player.rmSoloGamesCount,
    rm_solo_wins_count: player.rmSoloWinsCount,
    rm_solo_losses_count: player.rmSoloLossesCount,
  }));
}
