import { Injectable } from "@nestjs/common";
import { LeaderboardCacheService } from "./leaderboard-cache.service";
import { PLayerLeaderboard } from "@aoe4.fr/shared-types";
import { mapPlayersToPLayerLeaderboard, mapPlayersToTeamLeaderboard } from "./leaderboard.mapper";
import { PlayerRepository } from "src/player/player.repository";


@Injectable()
export class LeaderboardService {
   
    constructor(
        private readonly leaderboardCacheService: LeaderboardCacheService,
        private readonly playerRepository: PlayerRepository) {}
    
    public async updateLeaderboard(): Promise<PLayerLeaderboard[]> {
        const leaderboard = mapPlayersToPLayerLeaderboard(await this.playerRepository.findLeaderboardSolo());
        this.leaderboardCacheService.setLeaderboard(leaderboard);
        return leaderboard;
    }

    public async getLeaderboard(): Promise<PLayerLeaderboard[]> {
        const leaderboard = this.leaderboardCacheService.getLeaderboard();
        if (leaderboard.length === 0) {
            return await this.updateLeaderboard();
        }
        return leaderboard;
    }

    public async updateLeaderboardTeam(): Promise<PLayerLeaderboard[]> {
        const leaderboard = mapPlayersToTeamLeaderboard(await this.playerRepository.findLeaderboardTeam());
        this.leaderboardCacheService.setLeaderboardTeam(leaderboard);
        return leaderboard;
    }

    public async getLeaderboardTeam(): Promise<PLayerLeaderboard[]> {
        const leaderboard = this.leaderboardCacheService.getLeaderboardTeam();
        if (leaderboard.length === 0) {
            return await this.updateLeaderboardTeam();
        }
        return leaderboard;
    }
}