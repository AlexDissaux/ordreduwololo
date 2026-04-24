import { Controller, Get } from '@nestjs/common';
import { YouTubeService } from './youtube.service';

@Controller('youtube')
export class YouTubeController {
  constructor(private readonly youtubeService: YouTubeService) {}

  @Get('videos')
  async getVideos() {
    return this.youtubeService.getVideos();
  }

  @Get('channels')
  async getChannels() {
    return this.youtubeService.getChannels();
  }
}
