

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

        {teams.map((team, teamIndex) => {
            // Définir une couleur par équipe
            const teamColor = teamIndex === 0 ? 'bg-orange-500' :
                            teamIndex === 1 ? 'bg-cyan-500' :
                            teamIndex === 2 ? 'bg-purple-500' :
                            teamIndex === 3 ? 'bg-pink-500' :
                            teamIndex === 4 ? 'bg-green-500' :
                            'bg-indigo-500';
            
            return (
                <div key={teamIndex} className="w-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-900 transition-all duration-300 shadow-lg border border-gray-700/30 hover:border-gray-600/50">
                    <div className="flex flex-col lg:flex-row w-full">
                        {/* Titre de l'équipe à gauche (en haut sur mobile) */}
                        <div className="w-full lg:w-1/3 flex flex-col justify-center p-4 sm:p-6 lg:p-8 lg:border-r border-b lg:border-b-0 border-gray-700/50">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2">
                                {team.name}
                            </h2>
                            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mb-4"></div>
                            
                            {/* Score Total de l'équipe */}
                            <div className="space-y-4">
                                <div className="bg-purple-900/30 border-2 border-purple-500/50 px-4 py-3 mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300 font-bold text-base sm:text-lg">🏆 SCORE TOTAL</span>
                                        <span className="text-purple-400 font-black text-2xl sm:text-3xl">{team.rankingPoints} pts</span>
                                    </div>
                                </div>
                                
                                {/* Détail des disciplines */}
                                <div className="space-y-2">
                                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Disciplines :</div>
                                    
                                    <div className="bg-yellow-900/20 border border-yellow-500/30 px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-yellow-400 text-sm font-medium">Winrate</span>
                                            <span className="text-yellow-400 font-bold text-lg">{team.teamWinrate.winRate}%</span>
                                        </div>
                                        <div className="flex gap-2 mt-1 text-xs">
                                            <span className="text-green-400">{team.teamWinrate.win}W</span>
                                            <span className="text-red-400">{team.teamWinrate.lose}L</span>
                                            <span className="text-blue-400">{team.totalGames} Games</span>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-blue-900/20 border border-blue-500/30 px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-400 text-sm font-medium">Nombre de parties</span>
                                            <span className="text-blue-400 font-bold text-lg">{team.totalGames}</span>
                                        </div>
                                    </div>
                                    
                                    <div className={`border px-3 py-2 ${team.bestMmrChange >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-sm font-medium ${team.bestMmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>Meilleur MMR</span>
                                            <span className={`font-bold text-lg ${team.bestMmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                                {team.bestMmrChange >= 0 ? '+' : ''}{team.bestMmrChange}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-amber-900/20 border border-amber-500/30 px-3 py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-amber-400 text-sm font-medium">Diversité Civs</span>
                                            <span className="text-amber-400 font-bold text-lg">{team.totalCivDiversity}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Liste des joueurs à droite (en bas sur mobile) */}
                        <div className="w-full lg:w-2/3 py-2">
                            <div className="divide-y divide-gray-700/30">
                                {team.players.map((player: any, playerIndex: number) => (
                                    <div key={playerIndex} className={`px-3 sm:px-4 lg:px-6 py-2 hover:bg-gray-800/40 transition-colors duration-150 group relative ${
                                        playerIndex % 2 === 0 ? 'bg-gradient-to-r from-gray-800/10 to-transparent' : 'bg-gradient-to-r from-gray-800/5 to-transparent'
                                    } ${player.isCap ? 'bg-gradient-to-r from-yellow-900/10 via-transparent to-transparent border-l-2 border-yellow-500/30' : ''}`}>
                                        <div className="space-y-2">
                                            {/* En-tête du joueur */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    {player.isCap && (
                                                        <span className="text-yellow-400 text-base sm:text-lg flex-shrink-0">👑</span>
                                                    )}
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-bold text-sm sm:text-base lg:text-lg ${
                                                                player.isCap ? 'text-yellow-300' : 'text-white'
                                                            }`}>{player.name}</span>
                                                            {player.isCap && (
                                                                <span className="text-xs font-bold px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase tracking-wider hidden sm:inline">
                                                                    Cap
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Statistiques structurées en grid */}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                                                {/* Winrate */}
                                                <div className="bg-yellow-900/20 border border-yellow-500/30 px-2 py-1.5 text-center">
                                                    <div className="text-yellow-400 font-bold text-sm sm:text-base">{player.modes.rm_solo.win_rate}%</div>
                                                    <div className="text-gray-400 text-xs uppercase">Winrate</div>
                                                    <div className="flex justify-center gap-1 mt-0.5">
                                                        <span className="text-green-400 text-xs">{player.modes.rm_solo.wins_count}W</span>
                                                        <span className="text-red-400 text-xs">{player.modes.rm_solo.losses_count}L</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Parties jouées */}
                                                <div className="bg-blue-900/20 border border-blue-500/30 px-2 py-1.5 text-center">
                                                    <div className="text-blue-400 font-bold text-sm sm:text-base">{player.modes.rm_solo.wins_count + player.modes.rm_solo.losses_count}</div>
                                                    <div className="text-gray-400 text-xs uppercase">Games</div>
                                                </div>
                                                
                                                {/* MMR Change */}
                                                <div className={`border px-2 py-1.5 text-center ${player.modes.rm_solo.mmrChange >= 0 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-orange-900/20 border-orange-500/30'}`}>
                                                    <div className={`font-bold text-sm sm:text-base ${player.modes.rm_solo.mmrChange >= 0 ? 'text-cyan-400' : 'text-orange-400'}`}>
                                                        {player.modes.rm_solo.mmrChange >= 0 ? '+' : ''}{player.modes.rm_solo.mmrChange}
                                                    </div>
                                                    <div className="text-gray-400 text-xs uppercase">MMR</div>
                                                    <div className="text-gray-500 text-xs mt-0.5">
                                                        {player.modes.rm_solo.mmrBeg} → {player.modes.rm_solo.mmrEnd}
                                                    </div>
                                                </div>
                                                
                                                {/* Civilisations */}
                                                <div className="bg-amber-900/20 border border-amber-500/30 px-2 py-1.5 text-center">
                                                    <div className="text-amber-400 font-bold text-sm sm:text-base">{player.modes.rm_solo.nombreCivDiffJouer}</div>
                                                    <div className="text-gray-400 text-xs uppercase">Civs</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
} 