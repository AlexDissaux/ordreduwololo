import { Injectable } from "@nestjs/common";
import { PlayerService } from "../player";
import { fetchCurrentGames } from "./games.api";
import { CurrentGameDto, CurrentGamePlayerDto } from "./current-games.dto";


@Injectable()
export class CurrentGamesService {
    constructor(private readonly playerService: PlayerService) {}

    private currentGamesCache: CurrentGameDto[] = [];

    public async getCurrentGames(): Promise<CurrentGameDto[]> {
        if (this.currentGamesCache.length === 0) {
            await this.setCurrentGamesFromActivePlayers();
        }
        return this.currentGamesCache;
    }

    public async setCurrentGamesFromActivePlayers(): Promise<void> {
        const profileIds = await this.playerService.findAllProfileIdsFromActivePlayers();

        this.currentGamesCache =  (await fetchCurrentGames(profileIds))
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
            civilization_randomized: player.civilization_randomized,
            country: player.country,
            rating: player.rating,
        };
    }
}