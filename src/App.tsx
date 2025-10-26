import './App.css'
import Podium from './components/Podium'
import { Titre } from './components/Titre'
import Stat from './components/Stat/Stat'


function App() {

  return (
    <div className="min-h-screen bg-black px-6 py-8">
      <div className="w-full space-y-8">
        <Titre />  
        <Podium />
        <Stat/>
      </div>
    </div>
  )
}

export default App
