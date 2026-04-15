import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerApiService } from './player-api.service';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerSyncScheduler } from './player-sync.scheduler';
import { Player } from './entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerApiService, PlayerRepository, PlayerService, PlayerSyncScheduler],
  exports: [PlayerService, PlayerRepository],
})
export class PlayerModule {}
