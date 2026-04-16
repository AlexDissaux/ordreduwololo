import { Injectable } from "@nestjs/common";
import { PLayerLeaderboard } from "@aoe4.fr/shared-types";

@Injectable() 
export class LeaderboardCacheService {

    private leaderboard: PLayerLeaderboard[] = [];

    public setLeaderboard(leaderboard: PLayerLeaderboard[]): void {
        this.leaderboard = leaderboard;
    }
    
    public getLeaderboard(): PLayerLeaderboard[] {
        return this.leaderboard;
    }
}