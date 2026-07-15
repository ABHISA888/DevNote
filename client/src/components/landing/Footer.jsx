import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'About', href: '#about' }
    ]
  },
  {
    heading: 'Resources',
    links: [
      { label: 'GitHub Docs', href: 'https://docs.github.com' },
      { label: 'Tailwind CSS', href: 'https://tailwindcss.com' }
    ]
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Support & Inquiries', href: 'mailto:abhinivesh@devnote.io' }
    ]
  }
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ABHISA888/DevNote' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:abhinivesh@devnote.io' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
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

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              The complete developer workspace to plan projects, write notes, store environment variables, and sync with GitHub.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-600 hover:bg-slate-50"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-slate-800">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs font-semibold text-slate-500 transition hover:text-primary-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-100 pt-6 text-center">
          <p className="text-xs font-semibold text-slate-400">
            © {new Date().getFullYear()} DevNote. Designed and built by Abhinivesh S. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
