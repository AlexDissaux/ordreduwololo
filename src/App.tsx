import './App.css'
import Teams from './components/Team'
import Podium from './components/Podium'


function App() {

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Titre principal */}
        <div className="text-center py-8">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-6 pb-2">
            Le Wololo Challenge !
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto rounded-full"></div>
        </div>
        
        <Podium />
        
        {/* Séparateur entre podium et teams */}
        <div className="flex items-center space-x-4 py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800 rounded-lg border border-gray-600">
            <span className="text-gray-300 font-medium text-lg">⚔️</span>
            <span className="text-gray-300 font-bold text-lg">ÉQUIPES DÉTAILLÉES</span>
            <span className="text-gray-300 font-medium text-lg">⚔️</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>
        
        <Teams />
      </div>
    </div>
  )
}

export default App
