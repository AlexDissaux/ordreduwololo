import { Route, Routes } from 'react-router-dom';
import { WololoChallengeApp } from '@ordreduwololo-nx/wololo-challenge';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event/*" element={<WololoChallengeApp />} />
    </Routes>
  );
}

// Temporary home page - to be replaced with your actual vitrine content
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">L'Ordre du Wololo</h1>
        <p className="text-2xl mb-8">Site vitrine - Coming Soon</p>
        <a 
          href="/event" 
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition"
        >
          Voir le Challenge →
        </a>
      </div>
    </div>
  );
}

export default App;
