import { Injectable } from "@nestjs/common";
import { PlayerService } from "../player";
import { fetchCurrentGames } from "./games.api";
import { CurrentGameDto, CurrentGamePlayerDto } from "./current-games.dto";


@Injectable()
export class CurrentGamesService {
    constructor(private readonly playerService: PlayerService) {}

    public async getCurrentGames(): Promise<CurrentGameDto[]> {
        const profileIds = await this.playerService.findAllProfileIds();

        return (await fetchCurrentGames(profileIds))
            .filter((game: any) => game.ongoing)
            .map((game: any) => this.toCurrentGameDto(game));
    }

    private toCurrentGameDto(game: any): CurrentGameDto {
        return {
            map: game.map,
            leaderboard: game.leaderboard,
            teams: game.teams.map((team: any) =>
                team.map(({ player }: any) => this.toCurrentGamePlayerDto(player))
            ),
        };
    }

    private toCurrentGamePlayerDto(player: any): CurrentGamePlayerDto {
        return {
            name: player.name,
            civilization: player.civilization,
            rating: player.rating,
        };
    }
}