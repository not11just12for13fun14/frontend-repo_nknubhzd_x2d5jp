import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => setMe(data))
        .catch(() => {});
    }
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        const res = await fetch(`${API_BASE}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
        });
        if (!res.ok) throw new Error((await res.json()).detail || 'Sign up failed');
        // Auto-login after signup
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username: form.email, password: form.password }),
        });
        if (!loginRes.ok) throw new Error((await loginRes.json()).detail || 'Login failed');
        const t = await loginRes.json();
        localStorage.setItem('token', t.access_token);
        setToken(t.access_token);
      } else {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username: form.email, password: form.password }),
        });
        if (!res.ok) throw new Error((await res.json()).detail || 'Login failed');
        const t = await res.json();
        localStorage.setItem('token', t.access_token);
        setToken(t.access_token);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setMe(null);
  };

  if (token && me) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Signed in as</p>
          <p className="mt-1 text-xl font-semibold">{me.name}</p>
          <p className="text-sm text-neutral-500">{me.email}</p>
          <button onClick={logout} className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900">Sign out</button>
        </div>
      </section>
    );
  }

  return (
    <section id="auth" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto max-w-md rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{mode === 'signup' ? 'Create account' : 'Welcome back'}</h2>
          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="text-sm text-amber-600 hover:underline"
          >
            {mode === 'signup' ? 'Have an account? Log in' : "New here? Sign up"}
          </button>
        </div>
        {error && <p className="mt-3 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">{error}</p>}
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none dark:border-neutral-700 dark:bg-neutral-900"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none dark:border-neutral-700 dark:bg-neutral-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none dark:border-neutral-700 dark:bg-neutral-900"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
          >
            {loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Log in'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Auth;
