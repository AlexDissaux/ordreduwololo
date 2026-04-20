import { Controller, Get } from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Controller('twitch')
export class TwitchController {
    constructor(private readonly twitchService: TwitchService) {}

    @Get('streams')
    async getStreams() {
        return this.twitchService.getStreams();
    }

    @Get('vods')
    async getVods() {
        return this.twitchService.getVods();
    }
}
