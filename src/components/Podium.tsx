import { useTeams } from '../hook/useTeams';

export default function Podium() {
    const { teams } = useTeams();

    if (!teams || teams.length === 0) {
        return <div className="bg-gray-900/80 backdrop-blur-sm border-l-4 border-yellow-500 p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white text-center pb-4">Podium</h2>
            <div className="text-white text-center">Loading podium...</div>
        </div>;
    }

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm border-l-4 border-yellow-500 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500"></div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                    🏆 Podium
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500"></div>
            </div>
            
            <div className="divide-y divide-gray-700/30">
                {teams.slice(0, 6).map((team, index) => (
                    <div key={index} className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hover:bg-gray-800/40 transition-colors duration-150 group ${
                        index % 2 === 0 ? 'bg-gradient-to-r from-gray-800/10 to-transparent' : 'bg-gradient-to-r from-gray-800/5 to-transparent'
                    }`}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                                <div className={`w-1 h-10 sm:h-12 flex-shrink-0 ${
                                    index === 0 ? 'bg-yellow-500' :
                                    index === 1 ? 'bg-gray-400' :
                                    index === 2 ? 'bg-orange-600' :
                                    index === 3 ? 'bg-blue-500' :
                                    index === 4 ? 'bg-green-500' :
                                    'bg-purple-500'
                                } group-hover:h-12 sm:group-hover:h-14 transition-all`}></div>
                                
                                <span className={`text-xl sm:text-2xl flex-shrink-0 ${
                                    index === 0 ? 'text-yellow-400' :
                                    index === 1 ? 'text-gray-300' :
                                    index === 2 ? 'text-orange-400' :
                                    'opacity-0'
                                }`}>
                                    {index === 0 ? '🥇' : 
                                     index === 1 ? '🥈' : 
                                     index === 2 ? '🥉' : 
                                     ''}
                                </span>
                                
                                <span className={`font-bold text-base sm:text-lg lg:text-xl tracking-wide truncate ${
                                    index === 0 ? 'text-yellow-200' :
                                    index === 1 ? 'text-gray-200' :
                                    index === 2 ? 'text-orange-200' :
                                    index === 3 ? 'text-blue-200' :
                                    index === 4 ? 'text-green-200' :
                                    'text-purple-200'
                                }`}>
                                    {team.name}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-xs sm:text-sm font-semibold flex-shrink-0">
                                <span className="text-green-400 px-1.5 sm:px-2 lg:px-3 py-1">{team.teamWinrate.win}W</span>
                                <span className="text-red-400 px-1.5 sm:px-2 lg:px-3 py-1">{team.teamWinrate.lose}L</span>
                                <span className={`font-bold text-base sm:text-lg lg:text-xl px-1.5 sm:px-2 lg:px-3 py-1 ${
                                    index === 0 ? 'text-yellow-400' :
                                    index === 1 ? 'text-gray-300' :
                                    index === 2 ? 'text-orange-400' :
                                    index === 3 ? 'text-blue-400' :
                                    index === 4 ? 'text-green-400' :
                                    'text-purple-400'
                                }`}>
                                    {team.teamWinrate.winRate}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
