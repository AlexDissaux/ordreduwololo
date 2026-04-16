import { Controller, Get, Sse, MessageEvent } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrentGamesService } from "./current-games.services";


@Controller('current-games')
export class CurrentGamesController {

    constructor(private readonly currentGamesService: CurrentGamesService) {}

    @Get('')
    async getCurrentPlaying() {
            return await this.currentGamesService.getCurrentGames();
    }

    @Sse('stream')
    streamCurrentGames(): Observable<MessageEvent> {
        return this.currentGamesService.games$.pipe(
            map(games => ({ data: games }) as MessageEvent),
        );
    }

}