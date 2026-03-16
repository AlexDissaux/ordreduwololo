import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities';
import { PlayerApiService } from './player-api.service';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerSyncScheduler } from './player-sync.scheduler';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerApiService, PlayerService, PlayerSyncScheduler],
  exports: [PlayerService],
})
export class PlayerModule {}
