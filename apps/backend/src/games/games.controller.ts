import { Controller, Get, Sse, MessageEvent } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrentGamesService } from "./current-games.services";


@Controller('games')
export class GamesController {

    constructor(private readonly currentGamesService: CurrentGamesService) {}

    @Get('current-games')
    async getCurrentPlaying() {
            return await this.currentGamesService.getCurrentGames();
    }

    @Sse('current-games/stream')
    streamCurrentGames(): Observable<MessageEvent> {
        return this.currentGamesService.games$.pipe(
            map(games => ({ data: games }) as MessageEvent),
        );
    }

}