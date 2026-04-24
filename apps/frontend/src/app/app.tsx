import { Outlet, Route, Routes } from 'react-router-dom';
import { WololoChallengeApp } from '@aoe4.fr/wololo-challenge';
import { HomePage } from './home';
import { Header } from './layout/header';
import { LeaderboardPage } from './leaderboard/leaderboard-page';
import { CurrentGamesPage } from './current-games/current-games-page';
import { TwitchPage } from './twitch/twitch-page';
import { YouTubePage } from './youtube/youtube-page';

function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/classement" element={<LeaderboardPage />} />
        <Route path="/en-jeu" element={<CurrentGamesPage />} />
        <Route path="/twitch" element={<TwitchPage />} />
        <Route path="/youtube" element={<YouTubePage />} />
      </Route>
      <Route path="/event/*" element={<WololoChallengeApp />} />
    </Routes>
  );
}

export default App;
