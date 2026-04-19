import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardCacheModule } from "./leaderboard-cache.module";
import { PlayerModule } from "../player/player.module";

@Module({
    imports: [PlayerModule, LeaderboardCacheModule],
    controllers: [LeaderboardController],
    providers: [LeaderboardService],
    exports: [LeaderboardService],
})
export class LeaderboardModule {}