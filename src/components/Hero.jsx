

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["All", "Finance", "Developer", "Utility", "Text Tools", "Image Tools"];

export default function Hero({ onCategoryChange, activeCategory }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/tools?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-white border-b">

      <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">

        {/* Badge */}
        <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-100 border border-teal-200 px-4 py-1 rounded-full uppercase tracking-wide mb-6">
          100+ Free Tools
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Online tools &{" "}
          <span className="text-teal-500">guides</span>{" "}
          for everyone
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Calculators, converters, developer utilities, and in-depth guides —
          all in one place.  No cost. Ever.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 gap-3 shadow-lg max-w-xl mx-auto focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition">

            {/* Icon */}
            <svg
              className="text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            {/* Input */}
            <input
              type="text"
              placeholder="Search tools… e.g. EMI Calculator"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
            />

            {/* Button */}
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 text-sm rounded-full border transition 
                ${
                  activeCategory === cat
                    ? "bg-teal-500 text-white border-teal-500 shadow"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 text-center">
          <div>
            <p className="text-2xl font-bold text-teal-600">100+</p>
            <p className="text-xs text-gray-500">Free tools</p>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          <div>
            <p className="text-2xl font-bold text-teal-600">5</p>
            <p className="text-xs text-gray-500">Categories</p>
          </div>

          {/* <div className="w-px h-8 bg-gray-200" /> */}

          {/* <div>
            <p className="text-2xl font-bold text-teal-600">0</p>
            <p className="text-xs text-gray-500">Sign-ups needed</p>
          </div> */}
        </div>
      </div>

      {/* Background blur shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-100 opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-50 opacity-50 blur-3xl"></div>

    </section>
  );
}