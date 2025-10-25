

import { useTeams } from '../hook/useTeams';

export default function Teams() {
    const { teams } = useTeams();

    if (!teams) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-xl font-medium">Loading teams...</div>
        </div>;
    }

    // for each team display a title
    // print the player[0].modes.rm_solo.rating for each player
    // return the html :
    return <div className="w-full space-y-6 px-4">
        {teams.map((team, teamIndex) => (
                <div key={teamIndex} className="w-full bg-gray-900/80 backdrop-blur-sm border-l-4 border-gradient-to-b from-yellow-400 to-orange-500 hover:bg-gray-900 transition-all duration-300">
                    <div className="flex w-full">
                        {/* Titre de l'équipe à gauche */}
                        <div className="w-1/3 flex flex-col justify-center p-8 border-r border-gray-700/50">
                            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2">
                                {team.name}
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mb-4"></div>
                            
                            {/* Stats totales de l'équipe */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-yellow-400 text-lg">🏆</span>
                                    <span className="text-gray-300 font-bold">TEAM TOTAL</span>
                                </div>
                                <div className="flex flex-wrap gap-2 text-sm font-medium">
                                    <span className="text-gray-400 bg-gray-800/60 px-2 py-1">{team.teamWinrate.win + team.teamWinrate.lose} games</span>
                                    <span className="text-green-400 bg-green-900/30 px-2 py-1">{team.teamWinrate.win}W</span>
                                    <span className="text-red-400 bg-red-900/30 px-2 py-1">{team.teamWinrate.lose}L</span>
                                    <span className="text-yellow-400 font-bold bg-yellow-900/30 px-2 py-1">WR: {team.teamWinrate.winRate}%</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Liste des joueurs à droite */}
                        <div className="w-2/3 py-2">
                            <div className="divide-y divide-gray-700/30">
                                {team.players.map((player: any, playerIndex: number) => (
                                    <div key={playerIndex} className={`px-6 py-3 hover:bg-gray-800/40 transition-colors duration-150 group relative ${
                                        playerIndex % 2 === 0 ? 'bg-gradient-to-r from-gray-800/10 to-transparent' : 'bg-gradient-to-r from-gray-800/5 to-transparent'
                                    }`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-1 h-10 ${
                                                    playerIndex === 0 ? 'bg-orange-500' :
                                                    playerIndex === 1 ? 'bg-pink-500' :
                                                    playerIndex === 2 ? 'bg-blue-500' :
                                                    playerIndex === 3 ? 'bg-green-500' :
                                                    'bg-purple-500'
                                                } group-hover:h-12 transition-all`}></div>
                                                <span className="text-white font-bold text-xl tracking-wide">{player.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm font-semibold">
                                                <span className="text-green-400 px-3 py-1">{player.modes.rm_solo.wins_count}W</span>
                                                <span className="text-red-400 px-3 py-1">{player.modes.rm_solo.losses_count}L</span>
                                                <span className="text-yellow-400 font-bold px-3 py-1">WR: {player.modes.rm_solo.win_rate}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
    </div>
} 