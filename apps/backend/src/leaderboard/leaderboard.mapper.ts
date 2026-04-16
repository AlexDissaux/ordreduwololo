import { Player } from '../player/entities';
import { PLayerLeaderboard } from '@ordreduwololo-nx/shared-types';

export function mapPlayersToPLayerLeaderboard(players: Player[]): PLayerLeaderboard[] {
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
