


import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Tools', path: '/tools' },
  { label: 'Blog', path: '/blog' },
  { label: 'Categories', path: '/categories/all' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Text-Based Logo */}
        <Link
          to="/"
          className="group flex items-center gap-1 text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 select-none transition-all duration-200"
        >
          <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-200 inline-block">
            A
          </span>
          <span className="hover:text-teal-600 transition-colors duration-200">
            thenura
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = pathname === path
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition
                    ${isActive
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* CTA */}
          <Link
            to="/tools"
            className="hidden md:inline-block text-sm font-semibold text-white bg-teal-500 px-4 py-2 rounded-lg hover:bg-teal-600 hover:-translate-y-0.5 transition"
          >
            Get Started
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-gray-800 transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-gray-800 transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-gray-800 transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 border-t bg-white">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition
                    ${isActive
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <Link
            to="/tools"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block text-center text-sm font-semibold text-white bg-teal-500 py-2 rounded-lg"
          >
            Explore Tools
          </Link>
        </div>
      )}
    </header>
  )
}