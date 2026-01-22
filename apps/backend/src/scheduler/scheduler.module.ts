import { Module } from '@nestjs/common';
import { PlayerSyncScheduler } from './player-sync.scheduler';
import { PlayerModule } from '../player';

@Module({
  imports: [PlayerModule],
  providers: [PlayerSyncScheduler],
})
export class SchedulerModule {}
