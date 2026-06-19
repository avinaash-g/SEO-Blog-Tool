

import { Link } from 'react-router-dom'

export default function ToolCard({ tool }) {
  const { name, slug, description, category, icon } = tool

  const colorMap = {
    Finance: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      badge: 'bg-blue-50 text-blue-600'
    },
    Developer: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      badge: 'bg-green-50 text-green-600'
    },
    Utility: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      badge: 'bg-amber-50 text-amber-600'
    },
    Text: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      badge: 'bg-red-50 text-red-600'
    },
    Image: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      badge: 'bg-purple-50 text-purple-600'
    }
  }

  const color = colorMap[category] || colorMap.Finance

  return (
    <Link
      to={`/tools/${slug}`}
      aria-label={`Open ${name}`}
      className="group relative flex flex-col bg-white border border-gray-200 rounded-xl p-5 transition-all duration-200 hover:border-teal-400 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
    >

      {/* Icon */}
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg mb-3 ${color.bg} ${color.text}`}>
        {icon}
      </div>

      {/* Body */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-snug">
          {name}
        </h3>

        <p className="text-xs text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Badge */}
      <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full mt-4 uppercase tracking-wide ${color.badge}`}>
        {category}
      </span>

      {/* Arrow */}
      <svg
        className="absolute bottom-4 right-4 w-4 h-4 text-teal-400 opacity-0 translate-x-[-4px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>

    </Link>
  )
}