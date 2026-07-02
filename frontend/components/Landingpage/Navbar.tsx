"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

type NavLink = {
  label: string;
  path: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Tools", path: "/tools" },
  { label: "Blog", path: "/blog" },
  { label: "Categories", path: "/categories/all" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // ============================================================================
  // AUTHENTICATION RUNTIME CONFIGURATION CHECKPOINTS
  // ============================================================================
  // Toggle this simulation boolean true/false to preview authenticated state profiles locally!
  // NextAuth Integration: const { data: session } = useSession();
  const [isLoggedIn] = useState<boolean>(true); 
  const sessionUser = {
    name: "Avinaash G",
    email: "avinaash@toolverse.in",
    avatarUrl: "" // Provide image link here or leave empty to evaluate initial text fallback mode
  };

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E8E8FF]/80 dark:bg-black/80 backdrop-blur-md border-b border-violet-200/40 dark:border-white/10 w-full transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand Logo Anchor */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight select-none text-slate-900 dark:text-white group"
        >
          <div className="relative flex size-6 items-center justify-center rounded-md bg-slate-900/5 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D] transition-colors group-hover:bg-slate-900/10 group-hover:dark:bg-white/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-10 9h3v8h14v-8h3L12 3z"/>
            </svg>
          </div>
          <span className="font-sans">
            Tool
            <span className="text-violet-600 dark:text-[#A6FF5D] transition-colors duration-200">
              verse
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200
                  ${
                    isActive
                      ? "text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/10"
                      : "text-slate-600 dark:text-white/70 hover:text-slate-900 hover:dark:text-white hover:bg-slate-900/5 hover:dark:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side Control Blocks */}
        <div className="flex items-center gap-3">

          {/* Color Mode Trigger Node */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-900/5 hover:dark:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {mounted ? (
              isDark ? (
                <Sun size={16} className="text-[#A6FF5D]" />
              ) : (
                <Moon size={16} className="text-violet-600" />
              )
            ) : (
              <Moon size={16} />
            )}
          </button>

          {/* Conditional Session Render Pipeline */}
          {isLoggedIn ? (
            /* AUTHENTICATED STATE: Clean single Avatar layout. All profile details hide inside the dropdown */
            <div className="relative group py-2 flex items-center cursor-pointer">
              
              {/* Profile Ring/Trigger circle anchor element */}
              <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-violet-600 dark:border-[#A6FF5D] bg-violet-50 dark:bg-zinc-900 flex items-center justify-center shadow-xs transition group-hover:scale-105 duration-200">
                {sessionUser.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={sessionUser.avatarUrl} alt={sessionUser.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-bold font-mono text-violet-600 dark:text-[#A6FF5D]">
                    {sessionUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Advanced hover disclosure dropdown panel containing metadata paths */}
              <div className="absolute right-0 top-full pt-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-150 origin-top-right w-52">
                <div className="bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-xl p-3 shadow-xl text-left text-xs text-slate-700 dark:text-neutral-300 space-y-2">
                  
                  {/* Inline profile context headers inside dropdown card layout */}
                  <div className="pb-1 border-b border-slate-100 dark:border-white/5 flex flex-col">
                    <span className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{sessionUser.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono line-clamp-1 mt-0.5">{sessionUser.email}</span>
                  </div>

                  <Link href="/tools" className="block w-full px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 font-medium transition text-slate-800 dark:text-white">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="block w-full px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 font-medium transition text-slate-800 dark:text-white">
                    Settings Account
                  </Link>
                  <hr className="my-1 border-slate-100 dark:border-white/5" />
                  <button onClick={() => alert('Logout processing.')} className="block w-full text-left px-2 py-1.5 font-bold text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ANONYMOUS STATE: Show classic Get Started CTA button link route */
            <Link
              href="/tools"
              className="hidden md:inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full active:scale-95 transition-all duration-200 shadow-xs text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90"
            >
              Get Started
            </Link>
          )}

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-md border bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content Panel Drawer Option */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-6 pt-2 border-t absolute left-0 right-0 w-full shadow-lg z-50 bg-white dark:bg-black border-slate-200 dark:border-white/10">
          <div className="flex flex-col gap-1 mt-2">
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D]"
                      : "text-slate-600 dark:text-white/70 hover:bg-slate-900/5 hover:dark:bg-white/5 hover:text-slate-900 hover:dark:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {isLoggedIn ? (
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{sessionUser.name}</span>
                <span className="text-xs text-slate-400 font-mono">{sessionUser.email}</span>
              </div>
              <button 
                onClick={() => { setMenuOpen(false); alert('Mobile session disconnected.'); }}
                className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-lg border dark:border-rose-900/30"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/tools"
              onClick={() => setMenuOpen(false)}
              className="mt-5 block text-center text-sm font-medium py-3 rounded-full transition text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90"
            >
              Explore Tools
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

//===========================================================================


// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// type NavLink = {
//   label: string;
//   path: string;
// };

// const NAV_LINKS: NavLink[] = [
//   { label: "Home", path: "/" },
//   { label: "Tools", path: "/tools" },
//   { label: "Blog", path: "/blog" },
//   { label: "Categories", path: "/categories/all" },
//   { label: "About", path: "/about" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const [mounted, setMounted] = useState<boolean>(false);
//   const pathname = usePathname();
//   const { theme, setTheme, resolvedTheme } = useTheme();

//   useEffect(() => {
//     const handle = requestAnimationFrame(() => setMounted(true));
//     return () => cancelAnimationFrame(handle);
//   }, []);

//   // Compute if we are currently in dark mode
//   const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

//   const toggleTheme = () => {
//     setTheme(isDark ? "light" : "dark");
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-[#E8E8FF]/80 dark:bg-black/80 backdrop-blur-md border-b border-violet-200/40 dark:border-white/10 w-full transition-colors duration-200">
//       <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

//         {/* Brand Logo */}
//         <Link
//           href="/signup"
//           className="flex items-center gap-2 text-xl font-bold tracking-tight select-none text-slate-900 dark:text-white group"
//         >
//           <div className="relative flex size-6 items-center justify-center rounded-md bg-slate-900/5 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D] transition-colors group-hover:bg-slate-900/10 group-hover:dark:bg-white/20">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="m12 3-10 9h3v8h14v-8h3L12 3z"/>
//             </svg>
//           </div>
//           <span className="font-sans">
//             Tool
//             <span className="text-violet-600 dark:text-[#A6FF5D] transition-colors duration-200">
//               verse
//             </span>
//           </span>
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex items-center gap-1">
//           {NAV_LINKS.map(({ label, path }) => {
//             const isActive = pathname === path;
//             return (
//               <li key={path}>
//                 <Link
//                   href={path}
//                   className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200
//                   ${
//                     isActive
//                       ? "text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/10"
//                       : "text-slate-600 dark:text-white/70 hover:text-slate-900 hover:dark:text-white hover:bg-slate-900/5 hover:dark:bg-white/5"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Right Side Controls */}
//         <div className="flex items-center gap-3">

//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-900/5 hover:dark:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
//             aria-label="Toggle theme"
//             title={`Switch to ${isDark ? "light" : "dark"} theme`}
//           >
//             {mounted ? (
//               isDark ? (
//                 <Sun size={16} className="text-[#A6FF5D]" />
//               ) : (
//                 <Moon size={16} className="text-violet-600" />
//               )
//             ) : (
//               <Moon size={16} />
//             )}
//           </button>

//           {/* CTA Link */}
//           <Link
//             href="/tools"
//             className="hidden md:inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full active:scale-95 transition-all duration-200 shadow-xs text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90"
//           >
//             Get Started
//           </Link>

//           {/* Hamburger Menu */}
//           <button
//             onClick={() => setMenuOpen((o) => !o)}
//             className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-md border bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
//             aria-label="Toggle menu"
//           >
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "opacity-0" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden px-4 pb-6 pt-2 border-t absolute left-0 right-0 w-full shadow-lg z-50 bg-white dark:bg-black border-slate-200 dark:border-white/10">
//           <div className="flex flex-col gap-1 mt-2">
//             {NAV_LINKS.map(({ label, path }) => {
//               const isActive = pathname === path;
//               return (
//                 <Link
//                   key={path}
//                   href={path}
//                   onClick={() => setMenuOpen(false)}
//                   className={`text-sm font-medium px-4 py-3 rounded-xl transition
//                   ${
//                     isActive
//                       ? "bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D]"
//                       : "text-slate-600 dark:text-white/70 hover:bg-slate-900/5 hover:dark:bg-white/5 hover:text-slate-900 hover:dark:text-white"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               );
//             })}
//           </div>

//           <Link
//             href="/tools"
//             onClick={() => setMenuOpen(false)}
//             className="mt-5 block text-center text-sm font-medium py-3 rounded-full transition text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90"
//           >
//             Explore Tools
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// type NavLink = {
//   label: string;
//   path: string;
// };

// const NAV_LINKS: NavLink[] = [
//   { label: "Home", path: "/" },
//   { label: "Tools", path: "/tools" },
//   { label: "Blog", path: "/blog" },
//   { label: "Categories", path: "/categories/all" },
//   { label: "About", path: "/about" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const [mounted, setMounted] = useState<boolean>(false);
//   const pathname = usePathname();
  
//   // Use resolvedTheme to correctly detect actual applied mode even if set to 'system'
//   const { theme, setTheme, resolvedTheme } = useTheme();

//   useEffect(() => {
//     const handle = requestAnimationFrame(() => {
//       setMounted(true);
//     });
//     return () => cancelAnimationFrame(handle);
//   }, []);

//   // Determine if dark mode is active accurately
//   const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

//   const toggleTheme = () => {
//     setTheme(isDark ? "light" : "dark");
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 w-full transition-colors duration-200">
//       <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
//         {/* Brand Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-xl font-bold tracking-tight select-none text-slate-900 dark:text-white group"
//         >
//           <div className="relative flex size-6 items-center justify-center rounded-md bg-slate-900/5 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D] transition-colors group-hover:bg-slate-900/10 group-hover:dark:bg-white/20">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="m12 3-10 9h3v8h14v-8h3L12 3z"/>
//             </svg>
//           </div>
//           <span className="font-sans">
//             Tool<span className="text-violet-600 dark:text-[#A6FF5D] transition-colors duration-200">verse</span>
//           </span>
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex items-center gap-1">
//           {NAV_LINKS.map(({ label, path }) => {
//             const isActive = pathname === path;
//             return (
//               <li key={path}>
//                 <Link
//                   href={path}
//                   className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200
//                   ${
//                     isActive
//                       ? "text-violet-600 dark:text-[#A6FF5D] bg-violet-50 dark:bg-white/10"
//                       : "text-slate-600 dark:text-white/70 hover:text-slate-900 hover:dark:text-white hover:bg-slate-900/5 hover:dark:bg-white/5"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Right Side Controls */}
//         <div className="flex items-center gap-3">
          
//           {/* Theme Toggle Switch */}
//           <button
//             onClick={toggleTheme}
//             className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-900/5 hover:dark:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
//             aria-label="Toggle layout theme mode"
//           >
//             {isDark ? (
//               <Sun size={16} className="text-[#A6FF5D]" />
//             ) : (
//               <Moon size={16} className="text-violet-600" />
//             )}
//           </button>

//           {/* CTA Link */}
//           <Link
//             href="/tools"
//             className="hidden md:inline-flex items-center text-sm font-medium text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] px-5 py-2.5 rounded-full hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90 active:scale-95 transition-all duration-200 shadow-xs"
//           >
//             Get Started
//           </Link>

//           {/* Hamburger Menu */}
//           <button
//             onClick={() => setMenuOpen((o) => !o)}
//             className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-md bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
//             aria-label="Toggle menu"
//           >
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "opacity-0" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown Wrapper */}
//       {menuOpen && (
//         <div className="md:hidden px-4 pb-6 pt-2 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-black absolute left-0 right-0 w-full shadow-lg z-50">
//           <div className="flex flex-col gap-1 mt-2">
//             {NAV_LINKS.map(({ label, path }) => {
//               const isActive = pathname === path;
//               return (
//                 <Link
//                   key={path}
//                   href={path}
//                   onClick={() => setMenuOpen(false)}
//                   className={`text-sm font-medium px-4 py-3 rounded-xl transition
//                   ${
//                     isActive
//                       ? "bg-violet-50 dark:bg-white/10 text-violet-600 dark:text-[#A6FF5D]"
//                       : "text-slate-600 dark:text-white/70 hover:bg-slate-900/5 hover:dark:bg-white/5 hover:text-slate-900 hover:dark:text-white"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               );
//             })}
//           </div>

//           <Link
//             href="/tools"
//             onClick={() => setMenuOpen(false)}
//             className="mt-5 block text-center text-sm font-medium text-white dark:text-gray-900 bg-violet-600 dark:bg-[#A6FF5D] py-3 rounded-full hover:bg-violet-700 dark:hover:bg-[#A6FF5D]/90 transition"
//           >
//             Explore Tools
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }


