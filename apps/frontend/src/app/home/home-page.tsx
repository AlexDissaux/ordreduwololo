import { CurrentGames } from "../current-games";
import { Leaderboard } from "../leaderboard";

export function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CurrentGames></CurrentGames>
        <Leaderboard></Leaderboard>
      </div>
    </div>
  );
}
