import { Injectable, Logger } from '@nestjs/common';
import { ITwitchStream, ITwitchVod } from '@aoe4.fr/shared-types';
import { TwitchApiService } from './twitch-api.service';

const STREAMS_TTL = 2 * 60 * 1000;  // 2 minutes
const VODS_TTL    = 15 * 60 * 1000; // 15 minutes

@Injectable()
export class TwitchService {
    private readonly logger = new Logger(TwitchService.name);

    private cachedStreams: ITwitchStream[] = [];
    private streamsLastFetched = 0;

    private cachedVods: ITwitchVod[] = [];
    private vodsLastFetched = 0;

    constructor(private readonly twitchApiService: TwitchApiService) {}

    async getStreams(): Promise<ITwitchStream[]> {
        if (Date.now() - this.streamsLastFetched < STREAMS_TTL) {
            return this.cachedStreams;
        }
        try {
            this.cachedStreams = await this.twitchApiService.fetchLiveStreams();
            this.streamsLastFetched = Date.now();
        } catch (err) {
            this.logger.error('Failed to fetch Twitch streams', err);
        }
        return this.cachedStreams;
    }

    async getVods(): Promise<ITwitchVod[]> {
        if (Date.now() - this.vodsLastFetched < VODS_TTL) {
            return this.cachedVods;
        }
        try {
            this.cachedVods = await this.twitchApiService.fetchRecentVods();
            this.vodsLastFetched = Date.now();
        } catch (err) {
            this.logger.error('Failed to fetch Twitch VODs', err);
        }
        return this.cachedVods;
    }
}
