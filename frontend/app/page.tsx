import Link from "next/link";

import Navbar from "@/components/Landingpage/Navbar";
import HeroSection from "@/components/Landingpage/HeroSection";
import ToolCard from "@/components/Landingpage/ToolCard";
import BlogCard from "@/components/Landingpage/BlogCard";
import AdSlot from "@/components/Landingpage/AdSlot";
import Footer from "@/components/Landingpage/Footer";
import Testimonials from "@/components/Landingpage/Testimonials";

type Category = {
  label: string;
  path: string;
  icon: string;
  desc: string;
  count: number;
};

type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
};

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  readingTime: number;
  date: string;
};

const CATEGORY_INFO: Category[] = [
  { label: "Finance", path: "/category/finance", icon: "💰", desc: "Calculators & converters", count: 12 },
  { label: "Developer", path: "/category/developer", icon: "💻", desc: "Formatters, encoders & regex", count: 18 },
  { label: "Utility", path: "/category/utility", icon: "🛠️", desc: "Daily productivity boosters", count: 14 },
  { label: "Text", path: "/category/text", icon: "📝", desc: "Diff check, case converters", count: 8 },
  { label: "Image", path: "/category/image", icon: "🖼️", desc: "Compressors and resizers", count: 10 },
];

const ALL_TOOLS: Tool[] = [
  { id: "t1", name: "Compound Interest Calculator", slug: "compound-interest", description: "Calculate future wealth with visual graphs and breakdown tables.", category: "Finance", icon: "📈" },
  { id: "t2", name: "JSON Formatter & Validator", slug: "json-formatter", description: "Beautify, minify, and validate your JSON data strings instantly.", category: "Developer", icon: "🟢" },
  { id: "t3", name: "Base64 Encoder/Decoder", slug: "base64", description: "Securely encode and decode strings to and from Base64 format.", category: "Developer", icon: "🔐" },
  { id: "t4", name: "Password Generator", slug: "password-generator", description: "Create customizable secure passwords using cryptographic tools.", category: "Utility", icon: "🔑" },
  { id: "t5", name: "Markdown Live Editor", slug: "markdown-editor", description: "Write markdown syntax and view real-time HTML rendered outputs.", category: "Text", icon: "✍️" },
  { id: "t6", name: "Image Compressor", slug: "image-compressor", description: "Reduce JPEG/PNG image sizes up to 80% without losing visual clarity.", category: "Image", icon: "📉" },
  { id: "t7", name: "Regex Tester", slug: "regex-tester", description: "Build and test regular expressions with visual depth markers.", category: "Developer", icon: "🎯" },
  { id: "t8", name: "Unit Converter", slug: "unit-converter", description: "Convert metric and imperial units across lengths, weights, and times.", category: "Utility", icon: "📏" },
];

const BLOG_ARTICLES: Blog[] = [
  {
    id: "b1",
    title: "Understanding Compound Interest: The Eighth Wonder",
    slug: "understanding-compound-interest",
    excerpt: "Dive into how compounding frequencies affect your long-term savings yields and investments.",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    readingTime: 5,
    date: "June 15, 2026",
  },
  {
    id: "b2",
    title: "Top 10 Essential Regex Hacks for Modern Developers",
    slug: "top-regex-hacks",
    excerpt: "Master simple regex patterns for validation and text cleaning tasks.",
    category: "Developer",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    readingTime: 4,
    date: "June 12, 2026",
  },
  {
    id: "b3",
    title: "Why Client-Side Web Tools Are Better For Your Privacy",
    slug: "client-side-privacy",
    excerpt: "Explore how browser-based tool builds keep your data secure.",
    category: "Utility",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    readingTime: 6,
    date: "June 08, 2026",
  },
];

export default function HomePage() {
  const featuredTools = ALL_TOOLS.slice(0, 8);

  return (
    <main className="flex flex-col min-h-screen bg-[#F8F6FF] dark:bg-black text-slate-900 dark:text-zinc-100 antialiased selection:bg-violet-500/30 dark:selection:bg-[#A6FF5D]/30 transition-colors duration-200">
      <Navbar />

      {/* HERO SECTION */}
      <HeroSection />
      
      {/* TESTIMONIALS MARQUEE */}
      {/* <Testimonials /> */}

      {/* AD CONTAINER */}
      <div className="flex justify-center py-6 border-y border-slate-200 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md">
        <AdSlot slot="leaderboard" />
      </div>

      {/* EXPLORE CATEGORIES SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-white dark:to-[#0a0b0d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-slate-900 dark:text-white tracking-tight">
            Explore Categories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {CATEGORY_INFO.map((cat) => (
              <Link
                key={cat.label}
                href={cat.path}
                className="group flex flex-col items-center text-center gap-2 p-6 bg-white dark:bg-[#0d0e12] border border-slate-200 dark:border-white/5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-600/40 dark:hover:border-[#A6FF5D]/40 hover:shadow-xs"
              >
                <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-[#A6FF5D] transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-500 line-clamp-1">{cat.desc}</p>
                <span className="text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-white/5 px-2.5 py-1 rounded-md mt-2 group-hover:border-violet-600/20 dark:group-hover:border-[#A6FF5D]/20 group-hover:text-slate-800 dark:group-hover:text-zinc-300 transition-colors">
                  {cat.count} tools
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="py-24 px-4 bg-white dark:bg-[#060709] border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Popular Tools
            </h2>

            <Link href="/tools" className="text-sm font-medium text-violet-600 dark:text-[#A6FF5D] hover:text-violet-700 dark:hover:text-[#A6FF5D]/80 hover:underline transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-[#060709] dark:to-[#0a0b0d] border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Latest Articles
            </h2>

            <Link href="/blog" className="text-sm font-medium text-violet-600 dark:text-[#A6FF5D] hover:text-violet-700 dark:hover:text-[#A6FF5D]/80 hover:underline transition-colors">
              See all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

