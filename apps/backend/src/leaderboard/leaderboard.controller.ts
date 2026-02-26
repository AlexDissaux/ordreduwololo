import { Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardDto } from "./leaderboard.dto";

@Controller('leaderboard')
export class LeaderboardController {
    
    constructor(private readonly leaderboardService: LeaderboardService) {}
    
    @Get()
    async getLeaderboard(): Promise<LeaderboardDto[]> {
        return await this.leaderboardService.getLeaderboard()
    }
}