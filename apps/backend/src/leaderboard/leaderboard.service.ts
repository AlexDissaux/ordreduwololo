import { Injectable } from "@nestjs/common";
import { LeaderboardCacheService } from "./leaderboard-cache.service";
import { PLayerLeaderboard } from "@ordreduwololo-nx/shared-types";
import { mapPlayersToPLayerLeaderboard } from "./leaderboard.mapper";
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
        let leaderboard = this.leaderboardCacheService.getLeaderboard();
        if (leaderboard.length == 0) {
            return await this.updateLeaderboard();
        }
        return leaderboard;
    }
}