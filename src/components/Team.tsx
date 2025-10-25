

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
        <div className="w-full max-w-4xl space-y-8">
            {teams.map((team, teamIndex) => (
                <div key={teamIndex} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-white text-center border-b border-gray-600 pb-4">{team.name}</h2>
                    
                    <div className="space-y-1">
                        {team.players.map((player: any, playerIndex: number) => (
                            <div key={playerIndex} className={`bg-gray-900 p-4 border-l-4 ${
                                playerIndex === 0 ? 'border-orange-500' :
                                playerIndex === 1 ? 'border-pink-500' :
                                playerIndex === 2 ? 'border-blue-500' :
                                playerIndex === 3 ? 'border-green-500' :
                                'border-purple-500'
                            } hover:bg-gray-850 transition-colors`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className={`text-lg font-bold ${
                                            playerIndex === 0 ? 'text-orange-400' :
                                            playerIndex === 1 ? 'text-pink-400' :
                                            playerIndex === 2 ? 'text-blue-400' :
                                            playerIndex === 3 ? 'text-green-400' :
                                            'text-purple-400'
                                        }`}>
                                            {String(playerIndex + 1).padStart(2, '0')}.
                                        </span>
                                        <span className="text-white font-semibold text-lg">{player.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm font-medium">
                                        <span className="text-green-400 bg-green-900/30 px-2 py-1">{player.modes.rm_solo.wins_count}W</span>
                                        <span className="text-red-400 bg-red-900/30 px-2 py-1">{player.modes.rm_solo.losses_count}L</span>
                                        <span className="text-yellow-400 font-bold bg-yellow-900/30 px-2 py-1">WR: {player.modes.rm_solo.win_rate}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Team total stats */}
                        <div className="bg-gray-800 border-t-2 border-gray-600 p-4 mt-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-400 font-bold text-lg">🏆</span>
                                    <span className="text-gray-200 font-bold text-lg">TEAM TOTAL</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm font-medium">
                                    <span className="text-gray-300 bg-gray-700/50 px-3 py-1">({team.teamWinrate.win + team.teamWinrate.lose} games)</span>
                                    <span className="text-green-300 bg-green-900/30 px-3 py-1">{team.teamWinrate.win}W</span>
                                    <span className="text-red-300 bg-red-900/30 px-3 py-1">{team.teamWinrate.lose}L</span>
                                    <span className="text-yellow-300 font-bold bg-yellow-900/30 px-3 py-1">WR: {team.teamWinrate.winRate}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
} 