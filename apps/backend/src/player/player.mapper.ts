import { Player } from './entities/player.entity';
import { MergedPlayer } from './player.types';

export function mapPlayerToEntity(player: MergedPlayer): Partial<Player> {
  const rmSolo = player.rm_solo;
  const rmTeam = player.rm_team;

  return {
    profileId: player.profile_id,
    name: player.name,
    steamId: player.steam_id,
    country: player.country,
    twitchUrl: player.social?.twitch,
    youtubeUrl: player.social?.youtube,
    lastGameAt: player.last_game_at ? new Date(player.last_game_at) : null,
    rmSoloRating: rmSolo?.rating,
    rmSoloRank: rmSolo?.rank,
    rmSoloRankLevel: rmSolo?.rank_level,
    rmSoloGamesCount: rmSolo?.games_count,
    rmSoloWinsCount: rmSolo?.wins_count,
    rmSoloLossesCount: rmSolo?.losses_count,
    rmSoloWinRate: rmSolo?.win_rate,
    rmTeamRating: rmTeam?.rating,
    rmTeamRank: rmTeam?.rank,
    rmTeamRankLevel: rmTeam?.rank_level,
    rmTeamGamesCount: rmTeam?.games_count,
    rmTeamWinsCount: rmTeam?.wins_count,
    rmTeamLossesCount: rmTeam?.losses_count,
    rmTeamWinRate: rmTeam?.win_rate,
  };
}
