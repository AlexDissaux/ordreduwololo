import { useState } from 'react'
import './App.css'
import Player from './components/Player'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Player></Player>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>


    </div>
  )
}

export default App
