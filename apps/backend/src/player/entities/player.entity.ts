import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryColumn({ name: 'profile_id' })
  profileId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'steam_id', type: 'varchar', nullable: true })
  steamId: string | null;

  @Column({ type: 'varchar', nullable: true })
  country: string | null;

  @Column({ name: 'avatar_small', type: 'varchar', nullable: true })
  avatarSmall: string | null;

  @Column({ name: 'avatar_medium', type: 'varchar', nullable: true })
  avatarMedium: string | null;

  @Column({ name: 'avatar_full', type: 'varchar', nullable: true })
  avatarFull: string | null;

  @Column({ name: 'twitch_url', type: 'varchar', nullable: true })
  twitchUrl: string | null;

  @Column({ name: 'youtube_url', type: 'varchar', nullable: true })
  youtubeUrl: string | null;

  @Column({ name: 'last_game_at', type: 'timestamp', nullable: true })
  lastGameAt: Date | null;

  // Ranked Match Solo stats (rm_solo)
  @Column({ name: 'rm_solo_rating', type: 'int', nullable: true })
  rmSoloRating: number | null;

  @Column({ name: 'rm_solo_rank', type: 'int', nullable: true })
  rmSoloRank: number | null;

  @Column({ name: 'rm_solo_rank_level', type: 'varchar', nullable: true })
  rmSoloRankLevel: string | null;

  @Column({ name: 'rm_solo_games_count', type: 'int', nullable: true })
  rmSoloGamesCount: number | null;

  @Column({ name: 'rm_solo_wins_count', type: 'int', nullable: true })
  rmSoloWinsCount: number | null;

  @Column({ name: 'rm_solo_losses_count', type: 'int', nullable: true })
  rmSoloLossesCount: number | null;

  @Column({ name: 'rm_solo_win_rate', type: 'decimal', precision: 5, scale: 2, nullable: true })
  rmSoloWinRate: number | null;

  // Ranked Match Team stats (rm_team)
  @Column({ name: 'rm_team_rating', type: 'int', nullable: true })
  rmTeamRating: number | null;

  @Column({ name: 'rm_team_rank', type: 'int', nullable: true })
  rmTeamRank: number | null;

  @Column({ name: 'rm_team_rank_level', type: 'varchar', nullable: true })
  rmTeamRankLevel: string | null;

  @Column({ name: 'rm_team_games_count', type: 'int', nullable: true })
  rmTeamGamesCount: number | null;

  @Column({ name: 'rm_team_wins_count', type: 'int', nullable: true })
  rmTeamWinsCount: number | null;

  @Column({ name: 'rm_team_losses_count', type: 'int', nullable: true })
  rmTeamLossesCount: number | null;

  @Column({ name: 'rm_team_win_rate', type: 'decimal', precision: 5, scale: 2, nullable: true })
  rmTeamWinRate: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
