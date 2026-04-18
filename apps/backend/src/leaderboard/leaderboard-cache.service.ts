import { Injectable } from "@nestjs/common";
import { PLayerLeaderboard } from "@aoe4.fr/shared-types";

@Injectable() 
export class LeaderboardCacheService {

    private leaderboard: PLayerLeaderboard[] = [];
    private leaderboardTeam: PLayerLeaderboard[] = [];

    setLeaderboard(leaderboard: PLayerLeaderboard[]): void {
        this.leaderboard = leaderboard;
    }
    
    getLeaderboard(): PLayerLeaderboard[] {
        return this.leaderboard;
    }

    setLeaderboardTeam(leaderboard: PLayerLeaderboard[]): void {
        this.leaderboardTeam = leaderboard;
    }

    getLeaderboardTeam(): PLayerLeaderboard[] {
        return this.leaderboardTeam;
    }
}