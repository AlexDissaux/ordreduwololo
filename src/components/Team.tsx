

import { useTeams } from '../hook/useTeams';

export default function Teams() {
    const { teams } = useTeams();

    if (!teams) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white text-xl font-medium">Loading teams...</div>
        </div>;
    }

    // for each team display a title
    // print the player[0].modes.rm_solo.rating for each player
    // return the html :
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl space-y-6">
            {teams.map((team, teamIndex) => (
                <div key={teamIndex} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 text-white text-center">{team.name}</h2>
                    <div className="space-y-2">
                        {team.players.map((player: any, playerIndex: number) => (
                            <div key={playerIndex} className="bg-gray-900 rounded-md p-3 border border-gray-600">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <span className="text-white font-medium">{player.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm font-medium">
                                        <span className="text-green-400">{player.modes.rm_solo.wins_count}W</span>
                                        <span className="text-red-400">{player.modes.rm_solo.losses_count}L</span>
                                        <span className="text-yellow-400 font-bold">WR: {player.modes.rm_solo.win_rate}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
} 