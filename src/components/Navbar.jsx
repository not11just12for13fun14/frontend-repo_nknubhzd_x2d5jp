import React, { useEffect, useState } from 'react';
import { Coffee, Menu as MenuIcon, ShoppingCart, Sun, Moon } from 'lucide-react';

function Navbar({ theme, onToggleTheme, cartCount = 0, openingMessage }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const NavLink = ({ href, children, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      {children}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-amber-500" aria-hidden="true" />
          <span className="font-semibold">Brew Haven</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="#menu">Menu</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <span className="mx-2 hidden items-center gap-2 rounded-md bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 md:inline-flex">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
            {openingMessage}
          </span>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="relative ml-1 rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md p-2 hover:bg-neutral-100 md:hidden dark:hover:bg-neutral-800"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      {open && (
        <nav className="border-t border-neutral-200 px-4 py-2 dark:border-neutral-800 md:hidden">
          <div className="flex flex-col gap-1">
            <NavLink href="#menu" onClick={() => setOpen(false)}>Menu</NavLink>
            <NavLink href="#about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink href="#contact" onClick={() => setOpen(false)}>Contact</NavLink>
            <button
              onClick={() => {
                onToggleTheme();
                setOpen(false);
              }}
              className="mt-1 inline-flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              Toggle theme
            </button>
            <span className="mt-2 inline-flex items-center gap-2 rounded-md bg-neutral-100 px-3 py-2 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
              {openingMessage}
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
