import { Player } from '../player/entities';
import { PLayerLeaderboard } from '@aoe4.fr/shared-types';

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

export function mapPlayersToTeamLeaderboard(players: Player[]): PLayerLeaderboard[] {
  return players.map((player) => ({
    id: player.profileId,
    name: player.name,
    rm_solo_rating: player.rmTeamRating,
    rm_solo_rank_level: player.rmTeamRankLevel,
    rm_solo_games_count: player.rmTeamGamesCount,
    rm_solo_wins_count: player.rmTeamWinsCount,
    rm_solo_losses_count: player.rmTeamLossesCount,
  }));
}
