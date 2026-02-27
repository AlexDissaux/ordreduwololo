export interface CurrentGamePlayerDto {
    name: string;
    civilization: string;
    rating: number | null;
}

export interface CurrentGameDto {
    map: string;
    leaderboard: string;
    teams: CurrentGamePlayerDto[][];
}
