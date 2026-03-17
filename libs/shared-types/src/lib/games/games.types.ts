export interface ICurrentGamePlayer {
  name: string;
  civilization: string;
  civilization_randomized: boolean;
  country: string;
  rating: number | null;
}

export interface ICurrentGame {
  map: string;
  leaderboard: string;
  teams: ICurrentGamePlayer[][];
}
