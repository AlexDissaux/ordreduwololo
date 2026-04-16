import { Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";
import { PLayerLeaderboard } from "@ordreduwololo-nx/shared-types";

@Controller('leaderboard')
export class LeaderboardController {
    
    constructor(private readonly leaderboardService: LeaderboardService) {}
    
    @Get()
    async getLeaderboard(): Promise<PLayerLeaderboard[]> {
        return await this.leaderboardService.getLeaderboard()
    }
}