import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, IsNull, MoreThan, Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    private readonly repo: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.repo.find({
      order: { rmSoloRating: 'DESC' },
    });
  }

  async findLeaderboardSolo(): Promise<Player[]> {
    return this.repo.find({
      select: ['profileId', 'name', 'rmSoloRating', 'rmSoloRankLevel', 'rmSoloGamesCount', 'rmSoloWinsCount', 'rmSoloLossesCount'],
      where: { rmSoloRating: Not(IsNull()) },
      order: { rmSoloRating: 'DESC' },
    });
  }

  async findAllProfileIdsFromActivePlayers(): Promise<number[]> {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const players = await this.repo.find({
      select: ['profileId'],
      where: { lastGameAt: MoreThan(since) },
    });
    return players.map((player) => player.profileId);
  }

  async findAllProfileIds(): Promise<number[]> {
    const players = await this.repo.find({
      select: ['profileId'],
    });
    return players.map((player) => player.profileId);
  }

  async findOne(profileId: number): Promise<Player | null> {
    return this.repo.findOne({
      where: { profileId },
    });
  }

  async findForSync(): Promise<Pick<Player, 'profileId' | 'lastGameAt'>[]> {
    return this.repo.find({
      select: ['profileId', 'lastGameAt'],
    });
  }

  async upsert(players: Partial<Player>[]): Promise<void> {
    const BATCH_SIZE = 100;
    for (let i = 0; i < players.length; i += BATCH_SIZE) {
      await this.repo.upsert(players.slice(i, i + BATCH_SIZE), ['profileId']);
    }
  }
}
