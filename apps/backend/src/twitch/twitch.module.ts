import { Module } from '@nestjs/common';
import { TwitchController } from './twitch.controller';
import { TwitchService } from './twitch.service';
import { TwitchApiService } from './twitch-api.service';

@Module({
    controllers: [TwitchController],
    providers: [TwitchService, TwitchApiService],
})
export class TwitchModule {}
