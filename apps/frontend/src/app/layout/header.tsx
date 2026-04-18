import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 text-sm rounded-md transition-colors ${
    isActive ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
  }`;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="text-sm font-black uppercase tracking-wider">
          AoE4<span className="text-amber-400">.fr</span>
        </NavLink>
        <nav className="flex gap-1">
          <NavLink to="/" end className={navLinkClass}>Accueil</NavLink>
          <NavLink to="/classement" className={navLinkClass}>Classement</NavLink>
          <NavLink to="/en-jeu" className={navLinkClass}>Qui joue ?</NavLink>
        </nav>
      </div>
    </header>
  );
}
