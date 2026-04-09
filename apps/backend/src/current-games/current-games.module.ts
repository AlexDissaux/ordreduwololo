import { Module } from "@nestjs/common";
import { CurrentGamesSyncScheduler } from "./current-games-sync.scheduler";
import { CurrentGamesService } from "./current-games.services";
import { PlayerModule } from "../player";
import { CurrentGamesController } from "./current-games.controller";

@Module({
    imports: [PlayerModule],
    controllers: [CurrentGamesController],
    providers: [CurrentGamesService, CurrentGamesSyncScheduler]
})
export class CurrentGamesModule {}