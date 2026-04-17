import { Injectable } from "@nestjs/common";
import { BehaviorSubject, Observable } from "rxjs";
import { PlayerService } from "../player";
import { fetchCurrentGames } from "./current-games.api";
import { CurrentGameDto } from "./dto/current-games.dto";
import { toCurrentGameDto } from "./current-games.mapper";
import { PlayerRepository } from "src/player/player.repository";


@Injectable()
export class CurrentGamesService {
    constructor(private readonly playerService: PlayerService,
        private readonly playerRepository: PlayerRepository
    ) {}

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
        const profileIds = await this.playerRepository.findAllProfileIdsFromActivePlayers();

        const games = (await fetchCurrentGames(profileIds))
            .map(({ game, profileId }) => toCurrentGameDto(game, profileId));
        this.gamesSubject.next(games);
    }

}