import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/**
 * WHY THIS COMPONENT EXISTS:
 * The Navbar is the most persistent UI element on the page — it's sticky and
 * always visible. It gives users instant access to key sections and the primary
 * CTA (Get Started). Separating it keeps App.jsx and LandingPage.jsx clean.
 *
 * REACT CONCEPT: Local state (`useState`) for mobile menu toggle.
 * This avoids lifting state to the parent since menu visibility is purely
 * a local UI concern — it doesn't affect anything outside this component.
 *
 * TAILWIND: `sticky top-0 z-50` — keeps nav above all content while scrolling.
 * `backdrop-blur-sm bg-white/95` — glassmorphism effect for a modern feel.
 */

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#workflow' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2" aria-label="DevNote home">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
            <span className="text-xs font-black text-white">DN</span>
          </div>
          <span className="text-sm font-bold tracking-tight text-gray-900">DevNote</span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden items-center gap-7 md:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile Menu (collapsed/expanded) ── */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-3 md:hidden">
          <ul className="space-y-3" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="text-center text-sm font-medium text-gray-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
