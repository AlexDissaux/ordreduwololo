import { Module } from '@nestjs/common';
import { LeaderboardCacheService } from './leaderboard-cache.service';

@Module({
  providers: [LeaderboardCacheService],
  exports: [LeaderboardCacheService],
})
export class LeaderboardCacheModule {}
