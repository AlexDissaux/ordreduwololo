import { LeaderboardPreview } from '../leaderboard/leaderboard-preview';
import { CurrentGamesPreview } from '../current-games/current-games-preview';

export function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
          Communauté francophone
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight">Age of Empires IV</h1>
        <p className="mt-2 text-zinc-400 text-sm max-w-lg">
          Parties en cours et classements des joueurs francophones — France et Belgique.
          Twitch et Youtube francophones !
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeaderboardPreview />
        <CurrentGamesPreview />
      </div>
    </main>
  );
}

