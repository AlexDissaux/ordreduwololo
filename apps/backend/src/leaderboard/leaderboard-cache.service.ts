import { Injectable } from "@nestjs/common";
import { PLayerLeaderboard } from "@ordreduwololo-nx/shared-types";

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