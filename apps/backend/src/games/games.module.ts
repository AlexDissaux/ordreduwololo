import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { CurrentGamesSyncScheduler } from "./current-games-sync.scheduler";
import { CurrentGamesService } from "./current-games.services";
import { PlayerModule } from "../player";

@Module({
    imports: [PlayerModule],
    controllers: [GamesController],
    providers: [CurrentGamesService, CurrentGamesSyncScheduler]
})
export class GamesModule {}