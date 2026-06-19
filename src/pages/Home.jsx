

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HeroSection from '../components/Hero.jsx'
import ToolCard from '../components/ToolCard.jsx'
import BlogCard from '../components/BlogCard.jsx'
import AdSlot from '../components/AdSlot.jsx'


const CATEGORY_INFO = [
  { label: 'Finance', path: '/category/finance', icon: '💰', desc: 'Calculators & converters', count: 12 },
  { label: 'Developer', path: '/category/developer', icon: '💻', desc: 'Formatters, encoders & regex', count: 18 },
  { label: 'Utility', path: '/category/utility', icon: '🛠️', desc: 'Daily productivity boosters', count: 14 },
  { label: 'Text', path: '/category/text', icon: '📝', desc: 'Diff check, case converters', count: 8 },
  { label: 'Image', path: '/category/image', icon: '🖼️', desc: 'Compressors and resizers', count: 10 },
]


const ALL_TOOLS = [
  { id: 't1', name: 'Compound Interest Calculator', slug: 'compound-interest', description: 'Calculate future wealth with visual graphs and breakdown tables.', category: 'Finance', icon: '📈' },
  { id: 't2', name: 'JSON Formatter & Validator', slug: 'json-formatter', description: 'Beautify, minify, and validate your JSON data strings instantly.', category: 'Developer', icon: '🟢' },
  { id: 't3', name: 'Base64 Encoder/Decoder', slug: 'base64', description: 'Securely encode and decode strings to and from Base64 format.', category: 'Developer', icon: '🔐' },
  { id: 't4', name: 'Password Generator', slug: 'password-generator', description: 'Create customizable secure passwords using cryptographic tools.', category: 'Utility', icon: '🔑' },
  { id: 't5', name: 'Markdown Live Editor', slug: 'markdown-editor', description: 'Write markdown syntax and view real-time HTML rendered outputs.', category: 'Text', icon: '✍️' },
  { id: 't6', name: 'Image Compressor', slug: 'image-compressor', description: 'Reduce JPEG/PNG image sizes up to 80% without losing visual clarity.', category: 'Image', icon: '📉' },
  { id: 't7', name: 'Regex Tester', slug: 'regex-tester', description: 'Build and test regular expressions with visual capture groups.', category: 'Developer', icon: '🎯' },
  { id: 't8', name: 'Unit Converter', slug: 'unit-converter', description: 'Convert metric and imperial units across lengths, weights, and times.', category: 'Utility', icon: '📏' },
]


const BLOG_ARTICLES = [
  { id: 'b1', title: 'Understanding Compound Interest: The Eighth Wonder', slug: 'understanding-compound-interest', excerpt: 'Dive into how compounding frequencies affect your long-term savings yields and investments.', category: 'Finance', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=60', readingTime: 5, date: 'June 15, 2026' },
  { id: 'b2', title: 'Top 10 Essential Regex Hacks for Modern Developers', slug: 'top-regex-hacks', excerpt: 'Stop copying and pasting rules. Master these simple regular expression patterns for validation and cleaning text.', category: 'Developer', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60', readingTime: 4, date: 'June 12, 2026' },
  { id: 'b3', title: 'Why Client-Side Web Tools Are Better For Your Privacy', slug: 'client-side-privacy', excerpt: 'Explore how modern in-browser utilities keep your structural data secure by never transferring it to backend services.', category: 'Utility', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60', readingTime: 6, date: 'June 08, 2026' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredTools =
    activeCategory === 'All'
      ? ALL_TOOLS.slice(0, 8)
      : ALL_TOOLS.filter(t => t.category === activeCategory).slice(0, 8)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <HeroSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      
      <div className="flex justify-center items-center py-4 border-y bg-white">
        <AdSlot slot="leaderboard" />
      </div>

      
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
              Browse by topic
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              What are you looking for?
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORY_INFO.map(cat => (
              <Link
                key={cat.label}
                to={cat.path}
                className="flex flex-col items-center text-center gap-2 p-5 bg-white border rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-200"
              >
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="text-sm font-semibold">{cat.label}</h3>
                <p className="text-xs text-gray-500">{cat.desc}</p>
                <span className="text-xs bg-teal-100 text-teal-600 px-3 py-1 rounded-full">
                  {cat.count} tools
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
                Most used
              </p>
              <h2 className="text-3xl font-bold">
                {activeCategory === 'All'
                  ? 'Popular tools'
                  : `${activeCategory} tools`}
              </h2>
            </div>

            <Link
              to="/tools"
              className="text-sm font-semibold text-teal-600 hover:underline"
            >
              View all →
            </Link>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              No tools found yet.
            </p>
          )}
        </div>
      </section>

      
      <div className="flex justify-center items-center py-4 border-y bg-white">
        <AdSlot slot="responsive" />
      </div>

      
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
                Learn something new
              </p>
              <h2 className="text-3xl font-bold">Latest articles</h2>
            </div>

            <Link
              to="/blog"
              className="text-sm font-semibold text-teal-600 hover:underline"
            >
              See all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map(article => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-wider text-teal-400 mb-2">
            Why Toolverse
          </p>
          <h2 className="text-3xl font-bold">
            Built for speed and simplicity
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '⚡', title: 'Instant results', desc: 'Runs in browser, no waiting.' },
            { icon: '🔒', title: 'No account needed', desc: 'Use instantly anytime.' },
            { icon: '📱', title: 'Works on mobile', desc: 'Fully responsive.' },
            { icon: '🎯', title: 'SEO-grade content', desc: 'Detailed explanations.' },
          ].map(f => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
            >
              <span className="text-3xl block mb-3">{f.icon}</span>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AD */}
      <div className="flex justify-center items-center py-4 border-y bg-white">
        <AdSlot slot="leaderboard" />
      </div>

      <Footer />
    </div>
  )
}



// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Navbar from '../components/Navbar.jsx'
// import Footer from '../components/Footer.jsx'
// import HeroSection from '../components/Hero.jsx'
// import ToolCard from '../components/ToolCard.jsx'
// import BlogCard from '../components/BlogCard.jsx'
// import AdSlot from '../components/AdSlot.jsx'

// const ALL_TOOLS = []
// const BLOG_ARTICLES = []
// const CATEGORY_INFO = []

// export default function HomePage() {
//   const [activeCategory, setActiveCategory] = useState('All')

//   const filteredTools =
//     activeCategory === 'All'
//       ? ALL_TOOLS.slice(0, 8)
//       : ALL_TOOLS.filter(t => t.category === activeCategory).slice(0, 8)

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />

//       <HeroSection
//         activeCategory={activeCategory}
//         onCategoryChange={setActiveCategory}
//       />

//       {/* AD */}
//       <div className="flex justify-center items-center py-4 border-y bg-white">
//         <AdSlot slot="leaderboard" />
//       </div>

//       {/* CATEGORY */}
//       <section className="py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-10">
//             <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
//               Browse by topic
//             </p>
//             <h2 className="text-3xl font-bold text-gray-900">
//               What are you looking for?
//             </h2>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//             {CATEGORY_INFO.map(cat => (
//               <Link
//                 key={cat.label}
//                 to={cat.path}
//                 className="flex flex-col items-center text-center gap-2 p-5 bg-white border rounded-xl hover:shadow-lg hover:-translate-y-1 transition duration-200"
//               >
//                 <span className="text-3xl">{cat.icon}</span>
//                 <h3 className="text-sm font-semibold">{cat.label}</h3>
//                 <p className="text-xs text-gray-500">{cat.desc}</p>
//                 <span className="text-xs bg-teal-100 text-teal-600 px-3 py-1 rounded-full">
//                   {cat.count} tools
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TOOLS */}
//       <section className="py-20 px-4 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-10 flex justify-between items-center">
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
//                 Most used
//               </p>
//               <h2 className="text-3xl font-bold">
//                 {activeCategory === 'All'
//                   ? 'Popular tools'
//                   : `${activeCategory} tools`}
//               </h2>
//             </div>

//             <Link
//               to="/tools"
//               className="text-sm font-semibold text-teal-600 hover:underline"
//             >
//               View all →
//             </Link>
//           </div>

//           {filteredTools.length > 0 ? (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//               {filteredTools.map(tool => (
//                 <ToolCard key={tool.id} tool={tool} />
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 py-10">
//               No tools found yet.
//             </p>
//           )}
//         </div>
//       </section>

//       {/* AD */}
//       <div className="flex justify-center items-center py-4 border-y bg-white">
//         <AdSlot slot="responsive" />
//       </div>

//       {/* BLOG */}
//       <section className="py-20 px-4 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-10 flex justify-between items-center">
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
//                 Learn something new
//               </p>
//               <h2 className="text-3xl font-bold">Latest articles</h2>
//             </div>

//             <Link
//               to="/blog"
//               className="text-sm font-semibold text-teal-600 hover:underline"
//             >
//               See all →
//             </Link>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {BLOG_ARTICLES.map(article => (
//               <BlogCard key={article.id} article={article} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* WHY */}
//       <section className="py-20 px-4 bg-gray-900 text-white">
//         <div className="max-w-6xl mx-auto text-center mb-12">
//           <p className="text-xs uppercase tracking-wider text-teal-400 mb-2">
//             Why Toolverse
//           </p>
//           <h2 className="text-3xl font-bold">
//             Built for speed and simplicity
//           </h2>
//         </div>

//         <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             { icon: '⚡', title: 'Instant results', desc: 'Runs in browser, no waiting.' },
//             { icon: '🔒', title: 'No account needed', desc: 'Use instantly anytime.' },
//             { icon: '📱', title: 'Works on mobile', desc: 'Fully responsive.' },
//             { icon: '🎯', title: 'SEO-grade content', desc: 'Detailed explanations.' },
//           ].map(f => (
//             <div
//               key={f.title}
//               className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
//             >
//               <span className="text-3xl block mb-3">{f.icon}</span>
//               <h3 className="font-semibold mb-2">{f.title}</h3>
//               <p className="text-sm text-gray-400">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* AD */}
//       <div className="flex justify-center items-center py-4 border-y bg-white">
//         <AdSlot slot="leaderboard" />
//       </div>

//       <Footer />
//     </div>
//   )
// }