

interface SeparatorProps {
    showTeam: boolean;
    onToggle: (showTeam: boolean) => void;
}

export default function Separator({ showTeam, onToggle }: SeparatorProps) {
    return (
        <div className="w-full bg-gray-900/80 backdrop-blur-sm border-y border-gray-700/50 shadow-lg">
            <div className="flex items-stretch h-16 sm:h-20">
                {/* Bouton Équipes */}
                <button
                    onClick={() => onToggle(true)}
                    className={`relative overflow-hidden font-black text-lg sm:text-2xl lg:text-3xl transition-all duration-700 ease-in-out group ${
                        showTeam 
                            ? 'flex-[0.80] bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20' 
                            : 'flex-[0.20] bg-gradient-to-r from-yellow-600/30 via-orange-600/30 to-red-600/30 hover:from-yellow-500/40 hover:via-orange-500/40 hover:to-red-500/40 hover:scale-[1.02] cursor-pointer'
                    }`}
                >
                    {/* Effet de brillance au survol */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
                    
                    {/* Bordure animée en bas */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-700 ${
                        showTeam ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}></div>
                    
                    {/* Bordure latérale pour bouton inactif */}
                    {!showTeam && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 animate-pulse"></div>
                    )}
                    
                    {/* Contenu du bouton */}
                    <div className={`relative z-10 flex items-center justify-center h-full transition-all duration-700 ${
                        showTeam 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' 
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 group-hover:from-yellow-200 group-hover:via-orange-300 group-hover:to-red-300'
                    }`}>
                        <span className={`transition-all duration-700 ${showTeam ? 'scale-110' : 'scale-100 group-hover:scale-110 animate-bounce'}`}>
                            ⚔️
                        </span>
                        <span className={`ml-2 sm:ml-3 transition-all duration-700 ${
                            showTeam ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
                        }`}>
                            Équipes
                        </span>
                    </div>
                    
                    {/* Effet de lueur pour le bouton actif */}
                    {showTeam && (
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 animate-pulse"></div>
                    )}
                    
                    {/* Effet de pulsation subtile pour bouton inactif */}
                    {!showTeam && (
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 animate-pulse"></div>
                    )}
                </button>

                {/* Bouton Joueurs */}
                <button
                    onClick={() => onToggle(false)}
                    className={`relative overflow-hidden font-black text-lg sm:text-2xl lg:text-3xl transition-all duration-700 ease-in-out group ${
                        !showTeam 
                            ? 'flex-[0.75] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20' 
                            : 'flex-[0.25] bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 hover:from-blue-500/40 hover:via-purple-500/40 hover:to-pink-500/40 hover:scale-[1.02] cursor-pointer'
                    }`}
                >
                    {/* Effet de brillance au survol */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
                    
                    {/* Bordure animée en bas */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-700 ${
                        !showTeam ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}></div>
                    
                    {/* Bordure latérale pour bouton inactif */}
                    {showTeam && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 animate-pulse"></div>
                    )}
                    
                    {/* Contenu du bouton */}
                    <div className={`relative z-10 flex items-center justify-center h-full transition-all duration-700 ${
                        !showTeam 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500' 
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 group-hover:from-blue-200 group-hover:via-purple-300 group-hover:to-pink-300'
                    }`}>
                        <span className={`transition-all duration-700 ${!showTeam ? 'scale-110' : 'scale-100 group-hover:scale-110 animate-bounce'}`}>
                            👥
                        </span>
                        <span className={`ml-2 sm:ml-3 transition-all duration-700 ${
                            !showTeam ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
                        }`}>
                            Joueurs
                        </span>
                    </div>
                    
                    {/* Effet de lueur pour le bouton actif */}
                    {!showTeam && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
                    )}
                    
                    {/* Effet de pulsation subtile pour bouton inactif */}
                    {showTeam && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
                    )}
                </button>
            </div>
        </div>
    )
}