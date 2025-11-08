import React, { useEffect, useRef, useState } from 'react';

function StatCounter({ from = 0, to = 123456, duration = 3000 }) {
  const [value, setValue] = useState(from);
  const startRef = useRef(null);
  useEffect(() => {
    let raf;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration]);
  return <span>{value.toLocaleString()}</span>;
}

function AboutContact() {
  // Contact form state and validation
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (form.message.trim().length < 10) e.message = 'Please enter at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
      setSubmitted(false);
      alert('Thanks! Your message has been received.');
    }, 600);
  };

  return (
    <>
      <section id="about" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              At Brew Haven, we believe coffee is more than a drink—it's a ritual that brings people together. We partner with
              sustainable farms, roast in small batches, and bake our pastries fresh every morning.
            </p>
            <ul className="mt-6 space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>• Ethically sourced beans from independent growers</li>
              <li>• Compostable cups and zero-waste initiatives</li>
              <li>• Community events and barista workshops</li>
            </ul>
            <div className="mt-6 rounded-lg bg-neutral-100 p-4 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
              <p className="text-sm">Cups served since 2023</p>
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                <StatCounter from={0} to={234512} duration={2500} />
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h3 className="text-xl font-semibold">Where to find us</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              123 Roast Street, Beanville, USA
            </p>
            <div className="mt-4 aspect-video overflow-hidden rounded-lg">
              <iframe
                title="Brew Haven Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093734!2d144.95373531590457!3d-37.81627974201456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzE0LjAiRQ!5e0!3m2!1sen!2sus!4v1614030340204!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h3 className="text-xl font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Questions, feedback, or catering inquiries? Send us a note and we’ll get back to you.
            </p>
            <form onSubmit={onSubmit} className="mt-4 space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`mt-1 w-full rounded-md border bg-white px-3 py-2 outline-none dark:bg-neutral-900 ${
                    errors.name ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`mt-1 w-full rounded-md border bg-white px-3 py-2 outline-none dark:bg-neutral-900 ${
                    errors.email ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`mt-1 w-full rounded-md border bg-white px-3 py-2 outline-none dark:bg-neutral-900 ${
                    errors.message ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitted ? 'Sending...' : 'Send Message'}
              </button>
              {submitted && (
                <p className="text-sm text-emerald-600">Success! We'll be in touch shortly.</p>
              )}
            </form>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <h3 className="text-xl font-semibold">Opening Hours</h3>
            <ul className="mt-2 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
              <li>Mon–Fri: 7:00 AM – 7:00 PM</li>
              <li>Sat–Sun: 8:00 AM – 5:00 PM</li>
            </ul>
            <div className="mt-4 rounded-md bg-neutral-100 p-3 text-sm dark:bg-neutral-900">
              <LiveOpenStatus />
            </div>

            <h3 className="mt-8 text-xl font-semibold">Testimonials</h3>
            <Carousel
              items={[
                { quote: 'Best cappuccino in town and the friendliest baristas!', author: 'Jamie' },
                { quote: 'Cozy vibes and amazing pastries. A perfect weekend stop.', author: 'Priya' },
                { quote: 'Love the matcha and the sustainability focus. Five stars!', author: 'Alex' },
              ]}
              interval={3500}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function LiveOpenStatus() {
  const [text, setText] = useState('');
  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const day = now.getDay();
      const isWeekend = day === 0 || day === 6;
      const open = isWeekend ? 8 : 7;
      const close = isWeekend ? 17 : 19;
      const hour = now.getHours() + now.getMinutes() / 60;
      const isOpen = hour >= open && hour < close;
      if (isOpen) {
        const until = `${close > 12 ? close - 12 : close}:00 ${close >= 12 ? 'PM' : 'AM'}`;
        setText(`We’re open until ${until}!`);
      } else {
        setText('Closed now. See you soon!');
      }
    };
    compute();
    const t = setInterval(compute, 60 * 1000);
    return () => clearInterval(t);
  }, []);
  return <p>{text}</p>;
}

function Carousel({ items = [], interval = 4000 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  if (items.length === 0) return null;
  const current = items[index];
  return (
    <div className="mt-3 rounded-lg border border-neutral-200 p-4 text-sm dark:border-neutral-800">
      <p className="italic text-neutral-800 dark:text-neutral-200">“{current.quote}”</p>
      <p className="mt-2 text-right text-neutral-600 dark:text-neutral-400">— {current.author}</p>
      <div className="mt-3 flex justify-center gap-1">
        {items.map((_, i) => (
          <span key={i} className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-amber-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}></span>
        ))}
      </div>
    </div>
  );
}

export default AboutContact;
