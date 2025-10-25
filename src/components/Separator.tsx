

export default function Separator() {
    return (
        <div className="flex items-center space-x-4 py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700">
            <span className="text-gray-300 font-medium text-lg">⚔️</span>
            <span className="text-gray-300 font-bold text-lg">ÉQUIPES DÉTAILLÉES</span>
            <span className="text-gray-300 font-medium text-lg">⚔️</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>
    )
}