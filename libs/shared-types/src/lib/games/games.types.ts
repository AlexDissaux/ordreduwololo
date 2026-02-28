export interface ICurrentGamePlayer {
  name: string;
  civilization: string;
  rating: number | null;
}

export interface ICurrentGame {
  map: string;
  leaderboard: string;
  teams: ICurrentGamePlayer[][];
}
