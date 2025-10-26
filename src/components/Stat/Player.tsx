import { usePlayers } from "../../hook/usePlayers";


export default function Player() {
    const { players } = usePlayers()

    if (!players) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-xl font-medium">Loading players...</div>
        </div>;
    }

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-blue-500"></div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    👥 Joueurs
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-500 to-blue-500"></div>
            </div>
            
            {/* En-têtes du tableau - Visible uniquement sur desktop */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-4 py-2 border-b border-gray-700/50 text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Joueur</div>
                <div className="col-span-2">Équipe</div>
                <div className="col-span-2 text-center">Matchs</div>
                <div className="col-span-1 text-center">Victoires</div>
                <div className="col-span-1 text-center">Défaites</div>
                <div className="col-span-2 text-center">Win Rate</div>
            </div>
            
            <div className="divide-y divide-gray-700/20">
                {players.map((player, index) => {
                    // Couleurs en fonction du classement
                    const rankColor = 'text-gray-500';
                    
                    // Couleur de fond par équipe
                    const teamColors: Record<string, string> = {
                        'Team du turfu': 'from-orange-500/10',
                        'Team du tard l\'époque': 'from-cyan-500/10',
                        'Team du moment présent': 'from-purple-500/10',
                        'Team Alpha': 'from-pink-500/10',
                        'Team Bravo': 'from-green-500/10',
                        'Team Charlie': 'from-indigo-500/10',
                    };
                    
                    const teamBgGradient = teamColors[player.teamName] || 'from-gray-600/10';
                    
                    // Si c'est un capitaine, on renforce la couleur de l'équipe
                    const nameBgGradient = player.isCap 
                        ? teamBgGradient.replace('/10', '/20')
                        : teamBgGradient;
                    
                    return (
                        <div key={index} className={`px-3 sm:px-4 py-2 hover:bg-gray-800/40 transition-colors duration-150 group ${
                            index % 2 === 0 ? 'bg-gray-800/5' : 'bg-transparent'
                        } ${player.isCap ? 'border-l-2 border-yellow-500/30' : ''}`}>
                            {/* Layout Mobile/Tablette */}
                            <div className="lg:hidden flex items-center justify-between gap-3">
                                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                                    <span className={`${rankColor} font-bold text-sm sm:text-base flex-shrink-0 w-6`}>{index + 1}</span>
                                    {player.isCap && (
                                        <span className="text-yellow-400 text-base sm:text-lg flex-shrink-0 animate-pulse-subtle">👑</span>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className={`font-bold text-sm sm:text-base truncate ${
                                            player.isCap ? 'text-yellow-300' : 'text-white'
                                        }`}>{player.name}</div>
                                        <div className="text-xs text-blue-400 truncate">{player.teamName}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-semibold flex-shrink-0">
                                    <span className="text-green-400">{player.modes.rm_solo.wins_count}W</span>
                                    <span className="text-red-400">{player.modes.rm_solo.losses_count}L</span>
                                    <span className="text-yellow-400 font-bold text-sm sm:text-base">{player.modes.rm_solo.win_rate}%</span>
                                </div>
                            </div>
                            
                            {/* Layout Desktop */}
                            <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                                <div className="col-span-1">
                                    <span className={`${rankColor} font-bold text-lg`}>{index + 1}</span>
                                </div>
                                <div className={`col-span-3 bg-gradient-to-r ${nameBgGradient} to-transparent py-1 px-2 -mx-2 flex items-center gap-2`}>
                                    {player.isCap && (
                                        <span className="text-yellow-400 text-xl flex-shrink-0 animate-pulse-subtle">👑</span>
                                    )}
                                    <span className={`font-bold text-lg tracking-wide ${
                                        player.isCap ? 'text-yellow-300' : 'text-white'
                                    }`}>{player.name}</span>
                                    {player.isCap && (
                                        <span className="text-xs font-bold px-2 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase tracking-wider">
                                            Cap
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <div className="text-blue-400 font-medium text-sm">{player.teamName}</div>
                                    <div className="text-xs text-gray-500">{player.acronyme}</div>
                                </div>
                                <div className="col-span-2 text-center">
                                    <span className="text-gray-300 font-semibold">{player.modes.rm_solo.wins_count + player.modes.rm_solo.losses_count}</span>
                                </div>
                                <div className="col-span-1 text-center">
                                    <span className="text-green-400 font-bold">{player.modes.rm_solo.wins_count}</span>
                                </div>
                                <div className="col-span-1 text-center">
                                    <span className="text-red-400 font-bold">{player.modes.rm_solo.losses_count}</span>
                                </div>
                                <div className="col-span-2 text-center">
                                    <span className="text-yellow-400 font-bold text-lg">{player.modes.rm_solo.win_rate}%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
} 