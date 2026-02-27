import { Controller, Get } from "@nestjs/common";
import { CurrentGamesService } from "./current-games.services";


@Controller('games')
export class GamesController {

    constructor(private readonly currentGamesService: CurrentGamesService) {}

    @Get('current-games')
    async getCurrentPlaying() {
            return await this.currentGamesService.getCurrentGames();
    }

}