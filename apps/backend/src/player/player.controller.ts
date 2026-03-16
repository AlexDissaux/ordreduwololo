import { Controller, Get, Param, Post, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';
import { SyncResult } from './player.types';
import { Player } from './entities';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':profileId')
  async findOne(@Param('profileId', ParseIntPipe) profileId: number): Promise<Player | null> {
    return this.playerService.findOne(profileId);
  }

  @Post('sync')
  @HttpCode(HttpStatus.OK)
  async syncPlayers(): Promise<SyncResult> {
    return this.playerService.syncPlayers();
  }
}
