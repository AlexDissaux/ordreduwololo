import { Route, Routes } from 'react-router-dom';
import { WololoChallengeApp } from '@ordreduwololo-nx/wololo-challenge';
import { HomePage } from './home';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event/*" element={<WololoChallengeApp />} />
    </Routes>
  );
}

export default App;
