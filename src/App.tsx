import './App.css'
import { Titre } from './components/Titre'
import Stat from './components/Stat/Stat'
import BelgianLeaderboard from './components/BelgianLeaderboard'


function App() {

  return (
    <div className="min-h-screen bg-black px-0 sm:px-3 py-8">
      <div className="w-full space-y-8">
        <Titre />  
        <Stat/>
      </div>
      <BelgianLeaderboard />
    </div>
  )
}

export default App
