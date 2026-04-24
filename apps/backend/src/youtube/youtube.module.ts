import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YouTubeController } from './youtube.controller';
import { YouTubeService } from './youtube.service';
import { YouTubeApiService } from './youtube-api.service';
import { YouTubeChannelRepository } from './youtube-channel.repository';
import { YouTubeSyncScheduler } from './youtube-sync.scheduler';
import { YouTubeChannel } from './entities/youtube-channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YouTubeChannel])],
  controllers: [YouTubeController],
  providers: [YouTubeService, YouTubeApiService, YouTubeChannelRepository, YouTubeSyncScheduler],
})
export class YouTubeModule {}
