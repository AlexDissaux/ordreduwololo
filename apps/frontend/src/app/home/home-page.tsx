import { CurrentGames } from "../current-games";
import { Leaderboard } from "../leaderboard";

export function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* <CurrentGames></CurrentGames> */}
      <Leaderboard></Leaderboard>
    </div>
  );
}
