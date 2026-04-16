import { CurrentGameDto, CurrentGamePlayerDto } from "./dto/current-games.dto";

export function toCurrentGameDto(game: any, profileId?: number): CurrentGameDto {
    const teams: any[][] = game?.teams ?? [];
    const orderedTeams = profileId
        ? [...teams].sort((a) =>
            a.some(({ player }: any) => player.profile_id === profileId) ? -1 : 1
            )
        : teams;
    return {
        map: game.map,
        leaderboard: game.leaderboard,
        teams: orderedTeams.map((team: any) =>
            team.map(({ player }: any) => toCurrentGamePlayerDto(player))
        ),
    };
}

export function toCurrentGamePlayerDto(player: any): CurrentGamePlayerDto {
    return {
        name: player.name,
        civilization: player.civilization,
        civilization_randomized: player.civilization_randomized,
        country: player.country,
        rating: player.rating,
    };
}

