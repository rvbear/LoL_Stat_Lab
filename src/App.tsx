import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import clsx from 'clsx';

// Local Imports
import { useChampionData } from './hooks/useChampionData';
import { useChampionStore } from './store/useChampionStore';
import Spinner from './components/common/Spinner';
import ErrorToast from './components/common/ErrorToast';

function App() {
  useChampionData();
  const location = useLocation();
  const isLoading = useChampionStore((state) => state.isLoading);
  const error = useChampionStore((state) => state.error);
  const setError = useChampionStore((state) => state.setError);
  const championsCount = useChampionStore((state) => state.champions.length);
  const navigate = useNavigate();

  const handleCloseErrorToast = useCallback(() => {
    setError(null);
  }, [setError]);

  if (isLoading && championsCount === 0) {
    return <Spinner />;
  }

  const navLinkClasses = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
  const activeLinkClasses = 'text-hextech-gold-100 bg-hextech-blue-500';
  const inactiveLinkClasses = 'text-hextech-gold-400 hover:bg-hextech-blue-900';

  return (
    <div className="min-h-screen font-sans text-hextech-gold-100 selection:bg-hextech-teal selection:text-hextech-black">
      {error && (
        <ErrorToast message={error.message} onClose={handleCloseErrorToast} />
      )}
      
      <header className="sticky top-0 z-50 border-b border-hextech-gold-500 bg-hextech-black/90 py-4 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div 
            className="text-center md:text-left cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <h1 className="font-lol text-3xl font-bold uppercase tracking-widest text-hextech-gold-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              LoL Stat Lab
            </h1>
            <p className="text-xs tracking-wider text-hextech-teal">
              CHAMPION DATA ANALYTICS
            </p>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className={clsx(navLinkClasses, {
                [activeLinkClasses]: location.pathname === '/',
                [inactiveLinkClasses]: location.pathname !== '/',
              })}
            >
              챔피언 탐색기
            </Link>
            <Link
              to="/versus"
              className={clsx(navLinkClasses, {
                [activeLinkClasses]: location.pathname === '/versus',
                [inactiveLinkClasses]: location.pathname !== '/versus',
              })}
            >
              1:1 비교
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-8 border-t border-hextech-blue-900 py-8 text-center text-xs text-hextech-gold-500/50">
        <p>
          LoL Stat Lab isn’t endorsed by Riot Games and doesn’t reflect the
          views or opinions of Riot Games.
        </p>
        <p>© 2025 LoL Stat Lab. Data based on Riot API.</p>
      </footer>
    </div>
  );
}

export default App;

