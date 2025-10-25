import './App.css'
import Teams from './components/Team'
import Podium from './components/Podium'
import { Titre } from './components/Titre'
import Separator from './components/Separator'


function App() {

  return (
    <div className="min-h-screen bg-black px-6 py-8">
      <div className="w-full space-y-8">
        <Titre />        
          <Podium />
        <Separator />     
        <Teams />
      </div>
    </div>
  )
}

export default App
