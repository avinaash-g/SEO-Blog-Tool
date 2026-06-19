

import { Link } from 'react-router-dom'

export default function BlogCard({ article }) {
  const { title, slug, excerpt, category, image, readingTime, date } = article

  const categoryColors = {
    Finance: 'bg-blue-50 text-blue-600',
    Developer: 'bg-green-50 text-green-600',
    Utility: 'bg-amber-50 text-amber-600',
    Text: 'bg-red-50 text-red-600',
  }

  const color = categoryColors[category] || 'bg-blue-50 text-blue-600'

  return (
    <Link
      to={`/blog/${slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-teal-400 hover:shadow-md hover:-translate-y-0.5"
    >

      {/* Image */}
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${color}`}>
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {excerpt}
        </p>

        <div className="text-xs text-gray-400 flex items-center gap-1 mt-auto">
          <span>{readingTime} min read</span>
          <span className="text-gray-300">·</span>
          <span>{date}</span>
        </div>

      </div>
    </Link>
  )
}