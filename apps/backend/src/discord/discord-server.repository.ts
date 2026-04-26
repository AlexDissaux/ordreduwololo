import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordServer } from './entities/discord-server.entity';

@Injectable()
export class DiscordServerRepository {
  constructor(
    @InjectRepository(DiscordServer)
    private readonly repo: Repository<DiscordServer>,
  ) {}

  async upsertServer(data: {
    guildId: string;
    name: string;
    inviteUrl: string | null;
    onlineCount: number;
  }): Promise<void> {
    await this.repo.upsert(
      { ...data, lastSyncedAt: new Date() },
      ['guildId'],
    );
  }

  async findAll(): Promise<DiscordServer[]> {
    return this.repo.find({ order: { name: 'ASC' } });
  }
}
