import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { DiscordApiService } from './discord-api.service';
import { DiscordServerRepository } from './discord-server.repository';
import { DiscordSyncScheduler } from './discord-sync.scheduler';
import { DiscordServer } from './entities/discord-server.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscordServer])],
  controllers: [DiscordController],
  providers: [DiscordService, DiscordApiService, DiscordServerRepository, DiscordSyncScheduler],
})
export class DiscordModule {}
