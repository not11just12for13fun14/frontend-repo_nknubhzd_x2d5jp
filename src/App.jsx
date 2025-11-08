import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Menu from './components/Menu.jsx';
import AboutContact from './components/AboutContact.jsx';
import Auth from './components/Auth.jsx';

function App() {
  const [theme, setTheme] = useState('light');
  const [cartCount, setCartCount] = useState(0);

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
    } else {
      // Respect system preference on first visit
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to <html> element and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const addToCart = (n = 1) => setCartCount((c) => c + n);

  const openingMessage = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0=Sun
    const hour = now.getHours() + now.getMinutes() / 60;
    // Hours: Mon-Fri 7:00-19:00, Sat-Sun 8:00-17:00
    const isWeekend = day === 0 || day === 6;
    const openHour = isWeekend ? 8 : 7;
    const closeHour = isWeekend ? 17 : 19;
    const open = hour >= openHour && hour < closeHour;
    if (open) {
      const until = new Date();
      until.setHours(closeHour, 0, 0, 0);
      const remaining = Math.max(0, Math.floor((until - now) / (1000 * 60))); // minutes
      const hoursLeft = Math.floor(remaining / 60);
      const minsLeft = remaining % 60;
      const untilStr = `${closeHour > 12 ? closeHour - 12 : closeHour}:00 ${closeHour >= 12 ? 'PM' : 'AM'}`;
      return `We’re open until ${untilStr} • ${hoursLeft}h ${minsLeft}m left`;
    }
    const nextOpen = new Date(now);
    // compute next opening time
    if (!isWeekend && hour < 7) {
      nextOpen.setHours(7, 0, 0, 0);
    } else {
      // move to next day
      nextOpen.setDate(nextOpen.getDate() + 1);
      const nextDay = nextOpen.getDay();
      const nextIsWeekend = nextDay === 0 || nextDay === 6;
      nextOpen.setHours(nextIsWeekend ? 8 : 7, 0, 0, 0);
    }
    const label = nextOpen.toLocaleString(undefined, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
    return `Closed now • Opens ${label}`;
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar theme={theme} onToggleTheme={toggleTheme} cartCount={cartCount} openingMessage={openingMessage} />
      <main>
        <Hero />
        <Menu onAddToCart={addToCart} />
        <AboutContact />
        <Auth />
      </main>
      <footer className="border-t border-neutral-200 py-10 text-center text-sm dark:border-neutral-800">
        <p className="opacity-70">© {new Date().getFullYear()} Brew Haven — Crafted with care.</p>
      </footer>
    </div>
  );
}

export default App;
