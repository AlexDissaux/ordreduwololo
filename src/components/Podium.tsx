import { useTeams } from '../hook/useTeams';

export default function Podium() {
    const { teams } = useTeams();

    if (!teams || teams.length === 0) {
        return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white text-center border-b border-gray-600 pb-4">Podium</h2>
            <div className="text-white text-center">Loading podium...</div>
        </div>;
    }

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white text-center border-b border-gray-600 pb-4">🏆 Podium</h2>
            
            <div className="space-y-2">
                {teams.slice(0, 6).map((team, index) => (
                    <div key={index} className={`p-4 border-l-4 ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-900/50 to-yellow-800/30 border-yellow-500' :
                        index === 1 ? 'bg-gradient-to-r from-gray-600/50 to-gray-500/30 border-gray-400' :
                        index === 2 ? 'bg-gradient-to-r from-orange-900/50 to-orange-800/30 border-orange-600' :
                        index === 3 ? 'bg-gradient-to-r from-blue-900/50 to-blue-800/30 border-blue-500' :
                        index === 4 ? 'bg-gradient-to-r from-green-900/50 to-green-800/30 border-green-500' :
                        'bg-gradient-to-r from-purple-900/50 to-purple-800/30 border-purple-500'
                    } transition-colors hover:opacity-80`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className={`text-2xl font-bold ${
                                    index === 0 ? 'text-yellow-400' :
                                    index === 1 ? 'text-gray-300' :
                                    index === 2 ? 'text-orange-400' :
                                    index === 3 ? 'text-blue-400' :
                                    index === 4 ? 'text-green-400' :
                                    'text-purple-400'
                                }`}>
                                    {index === 0 ? '🥇' : 
                                     index === 1 ? '🥈' : 
                                     index === 2 ? '🥉' : 
                                    //  index === 3 ? '🏅' :
                                    //  index === 4 ? '🎖️' :
                                     '          '}
                                </span>
                                <span className={`font-semibold text-lg ${
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
                            <div className="flex items-center space-x-3">
                                <span className={`font-bold text-xl ${
                                    index === 0 ? 'text-yellow-300' :
                                    index === 1 ? 'text-gray-300' :
                                    index === 2 ? 'text-orange-300' :
                                    index === 3 ? 'text-blue-300' :
                                    index === 4 ? 'text-green-300' :
                                    'text-purple-300'
                                }`}>
                                    {team.teamWinrate.winRate}%
                                </span>
                                <span className="text-gray-400 text-sm">
                                    ({team.teamWinrate.win}W - {team.teamWinrate.lose}L)
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
