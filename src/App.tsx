import './App.css'
import Teams from './components/Team'
import Podium from './components/Podium'


function App() {

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <Podium />
        <Teams />
      </div>
    </div>
  )
}

export default App
