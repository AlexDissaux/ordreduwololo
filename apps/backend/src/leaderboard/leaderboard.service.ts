import { Injectable } from "@nestjs/common";
import { LeaderboardCacheService } from "./leaderboard-cache.service";
import { LeaderboardDto } from "./leaderboard.dto";
import { mapPlayersToLeaderboardDto } from "./leaderboard.mapper";
import { PlayerRepository } from "src/player/player.repository";


@Injectable()
export class LeaderboardService {
   
    constructor(
        private readonly leaderboardCacheService: LeaderboardCacheService,
        private readonly playerRepository: PlayerRepository) {}
    
    public async updateLeaderboard(): Promise<LeaderboardDto[]> {
        const leaderboardDto = mapPlayersToLeaderboardDto(await this.playerRepository.findLeaderboardSolo());
        this.leaderboardCacheService.setLeaderboard(leaderboardDto);
        return leaderboardDto;
    }

    public async getLeaderboard(): Promise<LeaderboardDto[]> {
        let leaderboardDto = this.leaderboardCacheService.getLeaderboard();
        if (leaderboardDto.length == 0) {
            return await this.updateLeaderboard();
        }
        return leaderboardDto;
    }
}