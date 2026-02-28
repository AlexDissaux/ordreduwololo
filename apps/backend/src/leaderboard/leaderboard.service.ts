import { Injectable } from "@nestjs/common";
import { Player, PlayerService } from "../player";
import { LeaderboardCacheService } from "./leaderboard-cache.service";
import { LeaderboardDto } from "./leaderboard.dto";


@Injectable()
export class LeaderboardService {
   
    constructor(
        private readonly leaderboardCacheService: LeaderboardCacheService,
        private readonly playerService: PlayerService) {}
    
    public async updateLeaderboard(): Promise<LeaderboardDto[]> {
        const allPLayers = await this.playerService.findLeaderboardSolo();
        const leaderboardDto = this.mapToDto(allPLayers);
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

    public mapToDto(player: Player[]): LeaderboardDto[] {
        return player.map((player) => ({
            "id": player.profileId,
            "name": player.name,
            "rm_solo_rating": player.rmSoloRating,
            "rm_solo_rank_level": player.rmSoloRankLevel,
            "rm_solo_games_count": player.rmSoloGamesCount,
            "rm_solo_wins_count": player.rmSoloWinsCount,
            "rm_solo_losses_count": player.rmSoloLossesCount
        }))
    }
}