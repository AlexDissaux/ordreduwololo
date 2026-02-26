import { Injectable } from "@nestjs/common";
import { LeaderboardDto } from "./leaderboard.dto";

@Injectable() 
export class LeaderboardCacheService {

    private leaderboard: LeaderboardDto[] = [];

    public setLeaderboard(leaderboard: LeaderboardDto[]): void {
        this.leaderboard = leaderboard;
    }
    
    public getLeaderboard(): LeaderboardDto[] {
        return this.leaderboard;
    }
}