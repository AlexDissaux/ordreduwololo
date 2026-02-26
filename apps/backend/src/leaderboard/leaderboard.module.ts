import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardCacheService } from "./leaderboard-cache.service";
import { PlayerModule } from "../player/player.module";

@Module({
    imports: [PlayerModule],
    controllers: [LeaderboardController],
    providers: [LeaderboardService, LeaderboardCacheService],
})
export class LeaderboardModule {}