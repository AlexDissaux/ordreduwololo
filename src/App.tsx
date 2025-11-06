import './App.css'
import { Titre } from './components/Titre'
import Stat from './components/Stat/Stat'


function App() {

  return (
    <div className="min-h-screen bg-black px-0 sm:px-3 py-8">
      <div className="w-full space-y-8">
        <Titre />  
        <Stat/>
      </div>
    </div>
  )
}

export default App
