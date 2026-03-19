import { Injectable } from "@nestjs/common";
import { BehaviorSubject, Observable } from "rxjs";
import { PlayerService } from "../player";
import { fetchCurrentGames } from "./games.api";
import { CurrentGameDto, CurrentGamePlayerDto } from "./current-games.dto";


@Injectable()
export class CurrentGamesService {
    constructor(private readonly playerService: PlayerService) {}

    private readonly gamesSubject = new BehaviorSubject<CurrentGameDto[]>([]);

    public get games$(): Observable<CurrentGameDto[]> {
        return this.gamesSubject.asObservable();
    }

    public async getCurrentGames(): Promise<CurrentGameDto[]> {
        if (this.gamesSubject.value.length === 0) {
            await this.setCurrentGamesFromActivePlayers();
        }
        return this.gamesSubject.value;
    }

    public async setCurrentGamesFromActivePlayers(): Promise<void> {
        const profileIds = await this.playerService.findAllProfileIdsFromActivePlayers();

        const games = (await fetchCurrentGames(profileIds))
            .map(({ game, profileId }) => this.toCurrentGameDto(game, profileId));
        this.gamesSubject.next(games);
    }

    private toCurrentGameDto(game: any, profileId?: number): CurrentGameDto {
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