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
    <div className="max-w-6xl mx-auto">

        <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500"></div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                    🏆 Podium
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500"></div>
            </div>
            
            <div className="space-y-3">
                {teams.slice(0, 6).map((team, index) => {
                    const captain = team.players.find((p: any) => p.isCap);
                    
                    // Couleurs et styles par position
                    const positionStyles = index === 0 ? {
                        bgGradient: 'bg-gradient-to-r from-yellow-500/15 via-yellow-600/10 to-transparent',
                        textColor: 'text-yellow-300',
                        badgeBg: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
                        badgeText: 'text-yellow-900',
                        wrColor: 'text-yellow-400',
                        medal: '🥇',
                        showMedal: true
                    } : index === 1 ? {
                        bgGradient: 'bg-gradient-to-r from-gray-400/15 via-gray-500/10 to-transparent',
                        textColor: 'text-gray-200',
                        badgeBg: 'bg-gradient-to-br from-gray-300 to-gray-500',
                        badgeText: 'text-gray-900',
                        wrColor: 'text-gray-300',
                        medal: '🥈',
                        showMedal: true
                    } : index === 2 ? {
                        bgGradient: 'bg-gradient-to-r from-orange-500/15 via-orange-600/10 to-transparent',
                        textColor: 'text-orange-300',
                        badgeBg: 'bg-gradient-to-br from-orange-400 to-orange-700',
                        badgeText: 'text-orange-900',
                        wrColor: 'text-orange-400',
                        medal: '🥉',
                        showMedal: true
                    } : {
                        bgGradient: 'bg-gradient-to-r from-gray-700/10 to-transparent',
                        textColor: 'text-gray-300',
                        badgeBg: 'bg-gradient-to-br from-gray-600 to-gray-800',
                        badgeText: 'text-gray-200',
                        wrColor: index === 3 ? 'text-blue-400' : index === 4 ? 'text-green-400' : 'text-purple-400',
                        medal: '',
                        showMedal: false
                    };
                    
                    return (
                    <div key={index} className={`${positionStyles.bgGradient} px-3 sm:px-6 lg:px-8 py-3 sm:py-5 hover:brightness-110 transition-all duration-200 group border border-gray-700/30 hover:border-gray-600/50`}>
                        {/* Layout Mobile */}
                        <div className="flex lg:hidden items-start gap-3">
                            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                {positionStyles.showMedal ? (
                                    <div className="text-2xl sm:text-3xl animate-pulse-subtle">
                                        {positionStyles.medal}
                                    </div>
                                ) : (
                                    <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${positionStyles.badgeBg} ${positionStyles.badgeText} font-black text-sm sm:text-base shadow-lg`}>
                                        #{index + 1}
                                    </div>
                                )}
                                <span className={`font-black text-base sm:text-lg ${positionStyles.wrColor}`}>
                                    {team.teamWinrate.winRate}%
                                </span>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <span className={`font-black text-base sm:text-lg tracking-wide block truncate ${positionStyles.textColor}`}>
                                    {team.name}
                                </span>
                                {captain && (
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-yellow-400 text-xs">👑</span>
                                        <span className="text-xs text-gray-400 truncate">
                                            <span className="text-yellow-300 font-semibold">{captain.name}</span>
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
                                    <span className="text-green-400 px-2 py-0.5 bg-green-900/20">{team.teamWinrate.win}W</span>
                                    <span className="text-red-400 px-2 py-0.5 bg-red-900/20">{team.teamWinrate.lose}L</span>
                                    <span className="text-blue-400 px-2 py-0.5 bg-blue-900/20">{team.totalGames} Games</span>
                                    <span className={`px-2 py-0.5 ${team.bestMmrChange >= 0 ? 'text-cyan-400 bg-cyan-900/20' : 'text-orange-400 bg-orange-900/20'}`}>
                                        {team.bestMmrChange >= 0 ? '+' : ''}{team.bestMmrChange} MMR
                                    </span>
                                    <span className="text-amber-400 px-2 py-0.5 bg-amber-900/20">{team.totalCivDiversity} Civs</span>
                                    <span className="text-purple-400 px-2 py-0.5 bg-purple-900/20 font-bold">{team.rankingPoints}pts</span>
                                </div>
                            </div>
                        </div>

                        {/* Layout Desktop */}
                        <div className="hidden lg:flex items-center justify-between gap-4">
                            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                                {/* Position badge */}
                                {positionStyles.showMedal ? (
                                    <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 text-3xl sm:text-4xl animate-pulse-subtle">
                                        {positionStyles.medal}
                                    </div>
                                ) : (
                                    <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 ${positionStyles.badgeBg} ${positionStyles.badgeText} font-black text-base sm:text-lg shadow-lg`}>
                                        #{index + 1}
                                    </div>
                                )}
                                
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className={`font-black text-lg sm:text-xl lg:text-2xl tracking-wide truncate ${positionStyles.textColor} group-hover:scale-[1.02] transition-transform origin-left`}>
                                        {team.name}
                                    </span>
                                    {captain && (
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-yellow-400 text-xs sm:text-sm">👑</span>
                                            <span className="text-xs sm:text-sm text-gray-400 truncate">
                                                <span className="text-yellow-300 font-semibold">{captain.name}</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-xs sm:text-sm font-semibold flex-shrink-0">
                                <span className="text-green-400 px-2 sm:px-3 py-1 bg-green-900/20">{team.teamWinrate.win}W</span>
                                <span className="text-red-400 px-2 sm:px-3 py-1 bg-red-900/20">{team.teamWinrate.lose}L</span>
                                <span className="text-blue-400 px-2 sm:px-3 py-1 bg-blue-900/20">{team.totalGames} Games</span>
                                <span className={`px-2 sm:px-3 py-1 ${team.bestMmrChange >= 0 ? 'text-cyan-400 bg-cyan-900/20' : 'text-orange-400 bg-orange-900/20'}`}>
                                    {team.bestMmrChange >= 0 ? '+' : ''}{team.bestMmrChange} MMR
                                </span>
                                <span className="text-amber-400 px-2 sm:px-3 py-1 bg-amber-900/20">{team.totalCivDiversity} Civs</span>
                                <span className="text-purple-400 px-2 sm:px-3 py-1 bg-purple-900/20 font-bold text-base sm:text-lg">{team.rankingPoints}pts</span>
                                <span className={`font-black text-xl sm:text-2xl lg:text-3xl px-2 sm:px-3 py-1 ${positionStyles.wrColor}`}>
                                    {team.teamWinrate.winRate}%
                                </span>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    </div>
    );
}
