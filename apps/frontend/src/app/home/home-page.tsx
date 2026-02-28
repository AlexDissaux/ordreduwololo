import { CurrentGames } from "../current-games";
import { Leaderboard } from "../leaderboard";

export function HomePage() {
  return (
    <div>
      <CurrentGames></CurrentGames>
      <Leaderboard></Leaderboard>
    </div>
  );
}
