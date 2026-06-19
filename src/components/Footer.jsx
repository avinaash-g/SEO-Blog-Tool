

import { Link } from 'react-router-dom'

const TOOL_LINKS = [
  { label: 'EMI Calculator', path: '/tools/emi-calculator' },
  { label: 'JSON Formatter', path: '/tools/json-formatter' },
  { label: 'QR Generator', path: '/tools/qr-generator' },
  { label: 'Password Generator', path: '/tools/password-generator' },
  { label: 'Age Calculator', path: '/tools/age-calculator' },
  { label: 'Word Counter', path: '/tools/word-counter' },
]

const COMPANY_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms', path: '/terms' },
]

const CATEGORY_LINKS = [
  { label: 'Finance Tools', path: '/categories/finance' },
  { label: 'Developer Tools', path: '/categories/developer' },
  { label: 'Utility Tools', path: '/categories/utility' },
  { label: 'Text Tools', path: '/categories/text' },
  { label: 'Image Tools', path: '/categories/image' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">

      
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        
        <div className="lg:col-span-1">
          <Link to="/" className="text-xl font-bold text-white tracking-tight inline-block mb-4">
            <span className="text-teal-400">A</span>thenura
          </Link>

          <p className="text-sm leading-relaxed max-w-xs mb-5">
            Free online tools and guides for everyone.
            . No limits.
          </p>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()}  All rights reserved.
          </p>
        </div>

        
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
            Popular tools
          </h4>

          <ul className="flex flex-col gap-2">
            {TOOL_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-sm hover:text-teal-400 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
            Categories
          </h4>

          <ul className="flex flex-col gap-2">
            {CATEGORY_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-sm hover:text-teal-400 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
            Company
          </h4>

          <ul className="flex flex-col gap-2">
            {COMPANY_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-sm hover:text-teal-400 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-4 px-6 text-center">
        <p className="text-xs text-gray-500">
          
        </p>
      </div>

    </footer>
  )
}