import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

/**
 * WHY THIS COMPONENT EXISTS:
 * The Footer is navigation infrastructure — it helps users who didn't convert
 * on the hero find the page they're looking for (pricing, docs, contact).
 * It also signals product maturity: a footer with real links tells visitors
 * this is a real product, not a side project.
 *
 * LAYOUT: Four-column grid on desktop (brand, product, resources, support).
 * On mobile it collapses to a single column. This is the standard SaaS footer
 * pattern used by Vercel, Linear, and Stripe.
 *
 * REACT CONCEPT: Rendering nested data structures.
 * The `columns` array contains objects with arrays inside them. We .map()
 * the outer array for columns, then .map() the inner `links` for list items.
 * This is "nested rendering" — a fundamental React pattern.
 */

const columns = [
  {
    heading: 'Product',
    links: ['Features', 'About', 'Blog', 'Pricing', 'Changelog'],
  },
  {
    heading: 'Resources',
    links: ['Documentation', 'DevNotes', 'Guides'],
  },
  {
    heading: 'Support',
    links: ['Privacy', 'Contact', 'Login', 'Legal'],
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2" aria-label="DevNote home">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600">
                <span className="text-xs font-black text-white">DN</span>
              </div>
              <span className="text-sm font-bold tracking-tight text-gray-900">DevNote</span>
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              The ultimate developer workspace. Organize your stack, manage complex tasks,
              and ship faster with your team.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition hover:border-gray-300 hover:text-gray-600"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-900">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-gray-500 transition hover:text-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} DevNote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
