import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ITwitchStream } from '@aoe4.fr/shared-types';
import { TwitchChannel } from './entities/twitch-channel.entity';

@Injectable()
export class TwitchChannelRepository {
  constructor(
    @InjectRepository(TwitchChannel)
    private readonly repo: Repository<TwitchChannel>,
  ) {}

  async upsertChannels(streams: ITwitchStream[]): Promise<void> {
    if (streams.length === 0) return;
    const channels = streams.map((s) => ({
      login: s.user_login.toLowerCase(),
      displayName: s.user_name,
      lastSeenLiveAt: new Date(),
    }));
    await this.repo.upsert(channels, ['login']);
  }

  async findAll(): Promise<TwitchChannel[]> {
    return this.repo.find({ order: { displayName: 'ASC' } });
  }

  async deleteInactive(cutoffDate: Date): Promise<number> {
    const result = await this.repo.delete({ lastSeenLiveAt: LessThan(cutoffDate) });
    return result.affected ?? 0;
  }
}
