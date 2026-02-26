

export function Leaderboard() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-5xl font-bold">L'Ordre du Wololo</h1>
        <p className="mb-8 text-xl">Players from backend: http://localhost:3000/players</p>

        <div className="mb-6 flex items-center gap-4">
          <a
            href="/event"
            className="inline-block rounded-lg bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-600"
          >
            Voir le Challenge →
          </a>
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg border border-white/40 px-4 py-2 font-semibold hover:bg-white/10"
          >
            Refresh players
          </button>
        </div>

        {isLoading && <p>Loading players...</p>}

        {error && <p className="text-red-300">{error}</p>}

        {!isLoading && !error && players.length === 0 && <p>No players found.</p>}

        {!isLoading && !error && players.length > 0 && (
          <div className="overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/10 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Solo Rating</th>
                  <th className="px-4 py-3">Solo Rank</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.profileId} className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">{player.name}</td>
                    <td className="px-4 py-3">{player.country ?? '-'}</td>
                    <td className="px-4 py-3">{player.rmSoloRating ?? '-'}</td>
                    <td className="px-4 py-3">{player.rmSoloRank ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    );
}