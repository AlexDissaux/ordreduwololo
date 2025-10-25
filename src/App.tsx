import './App.css'
import Teams from './components/Team'
import Podium from './components/Podium'
import { Titre } from './components/Titre'
import Separator from './components/Separator'
import Player from './components/Player'


function App() {

  return (
    <div className="min-h-screen bg-black px-6 py-8">
      <div className="w-full space-y-8">
        <Titre />  
        <Podium />
        <Separator />  
        <Player/>        
        <Teams />
      </div>
    </div>
  )
}

export default App
