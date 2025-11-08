import React, { useEffect, useMemo, useState } from 'react';

const MENU_DATA = [
  {
    id: 'c1',
    name: 'Espresso',
    description: 'Rich and bold single shot of espresso.',
    price: 3.0,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'c2',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and velvety foam.',
    price: 4.5,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't1',
    name: 'Matcha Latte',
    description: 'Stone-ground green tea whisked with milk.',
    price: 5.0,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxNYXRjaGElMjBMYXR0ZXxlbnwwfDB8fHwxNzYyNjIxNzk3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'Chai Latte',
    description: 'Spiced black tea simmered with milk.',
    price: 4.75,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p1',
    name: 'Butter Croissant',
    description: 'Flaky, buttery, freshly baked daily.',
    price: 3.5,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCdXR0ZXIlMjBDcm9pc3NhbnR8ZW58MHwwfHx8MTc2MjYyMTc5OHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
  },
  {
    id: 'p2',
    name: 'Blueberry Muffin',
    description: 'Studded with juicy blueberries and a crumb top.',
    price: 3.25,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cb1',
    name: 'Cold Brew',
    description: 'Slow-steeped for 18 hours. Smooth and refreshing.',
    price: 4.25,
    category: 'Cold Brew',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 's1',
    name: 'Pumpkin Spice Latte',
    description: 'Seasonal favorite with pumpkin and warm spices.',
    price: 5.25,
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop'
  }
];

const CATEGORIES = ['All', 'Coffee', 'Tea', 'Pastry', 'Cold Brew', 'Seasonal'];

function Menu({ onAddToCart }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [items, setItems] = useState(MENU_DATA);

  useEffect(() => {
    setItems(MENU_DATA);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchCategory = category === 'All' || i.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery = q === '' || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [items, category, query]);

  return (
    <section id="menu" className="relative mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Menu</h2>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">Brewed with care. Baked with love.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <div className="flex rounded-md border border-neutral-300 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-900">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            aria-label="Search menu items"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.id} className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
                </div>
                <div className="shrink-0 rounded-md bg-amber-100 px-2 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500">{item.category}</span>
                <button
                  onClick={() => onAddToCart?.(1)}
                  className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Menu;
