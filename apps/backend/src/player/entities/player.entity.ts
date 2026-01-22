import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

// TO DO, arrange that for postgrees integration

@Entity('players')
export class Player {
  @PrimaryColumn({ name: 'profile_id' })
  profileId: number;

  @Column()
  name: string;

  @Column({ name: 'steam_id', type: 'varchar', nullable: true })
  steamId: string | null;

  @Column({ nullable: true })
  country: string | null;

  @Column({ name: 'avatar_small', nullable: true })
  avatarSmall: string | null;

  @Column({ name: 'avatar_medium', nullable: true })
  avatarMedium: string | null;

  @Column({ name: 'avatar_full', nullable: true })
  avatarFull: string | null;

  @Column({ name: 'twitch_url', nullable: true })
  twitchUrl: string | null;

  @Column({ name: 'youtube_url', nullable: true })
  youtubeUrl: string | null;

  @Column({ name: 'last_game_at', type: 'timestamp', nullable: true })
  lastGameAt: Date | null;

  // Ranked Match Solo stats (rm_solo)
  @Column({ name: 'rm_solo_rating', nullable: true })
  rmSoloRating: number | null;

  @Column({ name: 'rm_solo_rank', nullable: true })
  rmSoloRank: number | null;

  @Column({ name: 'rm_solo_rank_level', nullable: true })
  rmSoloRankLevel: string | null;

  @Column({ name: 'rm_solo_games_count', nullable: true })
  rmSoloGamesCount: number | null;

  @Column({ name: 'rm_solo_wins_count', nullable: true })
  rmSoloWinsCount: number | null;

  @Column({ name: 'rm_solo_losses_count', nullable: true })
  rmSoloLossesCount: number | null;

  @Column({ name: 'rm_solo_win_rate', type: 'decimal', precision: 5, scale: 2, nullable: true })
  rmSoloWinRate: number | null;

  // Ranked Match Team stats (rm_team)
  @Column({ name: 'rm_team_rating', nullable: true })
  rmTeamRating: number | null;

  @Column({ name: 'rm_team_rank', nullable: true })
  rmTeamRank: number | null;

  @Column({ name: 'rm_team_rank_level', nullable: true })
  rmTeamRankLevel: string | null;

  @Column({ name: 'rm_team_games_count', nullable: true })
  rmTeamGamesCount: number | null;

  @Column({ name: 'rm_team_wins_count', nullable: true })
  rmTeamWinsCount: number | null;

  @Column({ name: 'rm_team_losses_count', nullable: true })
  rmTeamLossesCount: number | null;

  @Column({ name: 'rm_team_win_rate', type: 'decimal', precision: 5, scale: 2, nullable: true })
  rmTeamWinRate: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
