import React from 'react';
import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section id="home" className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/S4k-6fqjuV5AuVZe/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-4">
        <div className="max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/30 backdrop-blur dark:bg-black/20">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
            Freshly brewed daily
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Welcome to Brew Haven
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Your neighborhood spot for craft coffee, warm pastries, and cozy vibes. Pull up a chair and stay awhile.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#menu" className="inline-flex items-center rounded-md bg-amber-500 px-5 py-2.5 font-semibold text-white shadow hover:bg-amber-600">
              View Our Menu
            </a>
            <a href="#about" className="inline-flex items-center rounded-md bg-white/10 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20">
              Our Story
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
    </section>
  );
}

export default Hero;
