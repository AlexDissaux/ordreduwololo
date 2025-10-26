

import { useTeams } from '../../hook/useTeams';

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
    return <div className="w-full space-y-6 px-2 sm:px-4">
        {/* Titre de la section Teams */}
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center space-x-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500 to-orange-500"></div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                    ⚔️ Équipes Détaillées
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-orange-500 to-orange-500"></div>
            </div>
        </div>

        {teams.map((team, teamIndex) => (
                <div key={teamIndex} className="w-full bg-gray-900/80 backdrop-blur-sm border-l-4 border-gradient-to-b from-yellow-400 to-orange-500 hover:bg-gray-900 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row w-full">
                        {/* Titre de l'équipe à gauche (en haut sur mobile) */}
                        <div className="w-full lg:w-1/3 flex flex-col justify-center p-4 sm:p-6 lg:p-8 lg:border-r border-b lg:border-b-0 border-gray-700/50">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2">
                                {team.name}
                            </h2>
                            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mb-3 sm:mb-4"></div>
                            
                            {/* Stats totales de l'équipe */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <span className="text-yellow-400 text-base sm:text-lg">🏆</span>
                                    <span className="text-gray-300 font-bold text-sm sm:text-base">TEAM TOTAL</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">
                                    <span className="text-gray-400 bg-gray-800/60 px-2 py-1">{team.teamWinrate.win + team.teamWinrate.lose} games</span>
                                    <span className="text-green-400 bg-green-900/30 px-2 py-1">{team.teamWinrate.win}W</span>
                                    <span className="text-red-400 bg-red-900/30 px-2 py-1">{team.teamWinrate.lose}L</span>
                                    <span className="text-yellow-400 font-bold bg-yellow-900/30 px-2 py-1">WR: {team.teamWinrate.winRate}%</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Liste des joueurs à droite (en bas sur mobile) */}
                        <div className="w-full lg:w-2/3 py-2">
                            <div className="divide-y divide-gray-700/30">
                                {team.players.map((player: any, playerIndex: number) => (
                                    <div key={playerIndex} className={`px-3 sm:px-4 lg:px-6 py-3 hover:bg-gray-800/40 transition-colors duration-150 group relative ${
                                        playerIndex % 2 === 0 ? 'bg-gradient-to-r from-gray-800/10 to-transparent' : 'bg-gradient-to-r from-gray-800/5 to-transparent'
                                    }`}>
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                                                <div className={`w-1 h-8 sm:h-10 flex-shrink-0 ${
                                                    playerIndex === 0 ? 'bg-orange-500' :
                                                    playerIndex === 1 ? 'bg-pink-500' :
                                                    playerIndex === 2 ? 'bg-blue-500' :
                                                    playerIndex === 3 ? 'bg-green-500' :
                                                    'bg-purple-500'
                                                } group-hover:h-10 sm:group-hover:h-12 transition-all`}></div>
                                                <span className="text-white font-bold text-base sm:text-lg lg:text-xl tracking-wide truncate">{player.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 text-xs sm:text-sm font-semibold flex-shrink-0">
                                                <span className="text-green-400 px-1.5 sm:px-2 lg:px-3 py-1">{player.modes.rm_solo.wins_count}W</span>
                                                <span className="text-red-400 px-1.5 sm:px-2 lg:px-3 py-1">{player.modes.rm_solo.losses_count}L</span>
                                                <span className="text-yellow-400 font-bold px-1.5 sm:px-2 lg:px-3 py-1 hidden sm:inline">WR: {player.modes.rm_solo.win_rate}%</span>
                                                <span className="text-yellow-400 font-bold px-1.5 sm:px-2 lg:px-3 py-1 sm:hidden">{player.modes.rm_solo.win_rate}%</span>
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