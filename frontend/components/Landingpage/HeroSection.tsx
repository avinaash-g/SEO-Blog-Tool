// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';

// export default function HeroSection() {
//   const { theme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     const handle = requestAnimationFrame(() => {
//       setMounted(true);
//     });
//     return () => cancelAnimationFrame(handle);
//   }, []);

//   const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
//         * {
//           font-family: 'Poppins', sans-serif;
//         }
        
//         /* Slow drifting animation for the background glow blobs */
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) scale(1); }
//           50% { transform: translateY(20px) scale(1.05); }
//         }
//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float 10s ease-in-out infinite;
//           animation-delay: 2s;
//         }
//       `}</style>

//       <section
//         className={`relative flex flex-col items-center px-4 py-4 min-h-screen w-full transition-all duration-300 overflow-hidden
//           ${isDark
//             ? 'bg-black bg-gradient-to-b from-zinc-950 to-black'
//             : 'bg-gradient-to-b from-[#E8E8FF] via-[#EAE9FF] to-[#F3F1FF]'
//           }`}
//       >
//         {/* --- BACKGROUND LAYER --- */}
//         <div className="absolute inset-0 pointer-events-none select-none z-0">
          
//           {/* 1. Technical Grid Pattern */}
//           <div 
//             className={`absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
//               ${isDark 
//                 ? 'text-zinc-800 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]' 
//                 : 'text-violet-200 [background-image:linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)]'
//               }`}
//             style={{ backgroundSize: '32px 32px' }}
//           />

//           {/* 2. Dynamic Mesh Glow Blobs (Now optimized for both states) */}
//           <div className="absolute inset-0 overflow-hidden">
//             {/* Top Left Blob */}
//             <div className={`absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-500 animate-float
//               ${isDark 
//                 ? 'bg-gradient-to-br from-violet-900/15 to-emerald-900/5' 
//                 : 'bg-gradient-to-br from-violet-600/15 to-pink-500/15'
//               }`} 
//             />
            
//             {/* Top Right Blob */}
//             <div className={`absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-500 animate-float-delayed
//               ${isDark 
//                 ? 'bg-gradient-to-bl from-emerald-900/15 to-violet-900/5' 
//                 : 'bg-gradient-to-bl from-violet-600/15 to-pink-500/10'
//               }`} 
//             />
//           </div>
//         </div>

//         {/* --- CONTENT LAYER --- */}
//         <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
          
//           {/* Trust Badge */}
//           <div className={`flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-20 md:mt-30 rounded-full backdrop-blur-md border
//             ${isDark
//               ? 'bg-white/5 border-white/10'
//               : 'bg-white/70 border-violet-200/60 shadow-xs'
//             }`}
//           >
//             <div className="relative flex size-3.5 items-center justify-center">
//               <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
//               <span className={`relative inline-flex size-2 rounded-full ${isDark ? 'bg-[#A6FF5D]' : 'bg-green-500'}`}></span>
//             </div>
//             <p className={`text-xs font-semibold tracking-wide uppercase px-1 ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
//               Live Tools
//             </p>
//           </div>

//           {/* Headline */}
//           <h1 className={`text-4xl md:text-[66px] text-center max-w-4xl mt-8 leading-tight font-bold tracking-tight pb-2
//             ${isDark ? 'text-white' : 'text-[#1E2238]'}`}
//           >
//             Online Tools and Guides for Everyone
//           </h1>

//           {/* Subparagraph */}
//           <p className={`text-sm md:text-base text-center max-w-[630px] mt-4 leading-relaxed font-normal
//             ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
//           >
//             We have designed high-impact tools that can give better results. From sleek interfaces to full stack experiences, we bring your brand to life online.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex gap-3 mt-10">
//             <button className={`text-xs md:text-sm px-6 py-3 rounded-xl transition cursor-pointer font-medium shadow-md hover:scale-[1.02] active:scale-95 duration-200
//               ${isDark
//                 ? 'bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900'
//                 : 'bg-violet-600 hover:bg-violet-700 text-white'
//               }`}
//             >
//               Get Started
//             </button>
//             <button className={`text-xs md:text-sm px-5 py-3 rounded-xl transition cursor-pointer font-medium shadow-sm border hover:scale-[1.02] active:scale-95 duration-200
//               ${isDark
//                 ? 'bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800 text-zinc-300'
//                 : 'bg-white hover:bg-gray-50 border-slate-200 text-slate-700'
//               }`}
//             >
//               Explore Tools
//             </button>
//           </div>

//           {/* Divider Line */}
//           <div className={`w-full max-w-[800px] h-[1px] mt-16 bg-gradient-to-r from-transparent to-transparent opacity-40
//             ${isDark ? 'via-[#A6FF5D]' : 'via-violet-400'}`}
//           ></div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 max-w-[930px] w-full mt-4">
//             {[
//               { value: '20+', label: 'Years Experience' },
//               { value: '12k+', label: 'Projects Completed' },
//               { value: '5k+', label: 'Happy Customers' },
//               { value: '5+', label: 'Countries' },
//             ].map((stat) => (
//               <div key={stat.label} className="text-center">
//                 <h2 className={`font-bold text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-slate-800'}`}>
//                   {stat.value}
//                 </h2>
//                 <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function HeroSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section
        className={`flex flex-col items-center px-4 py-4 min-h-screen w-full transition-all duration-300
          ${isDark
            ? 'bg-gradient-to-b from-black to-black dark:bg-black dark:bg-[url(\'https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png\')] bg-no-repeat bg-center bg-cover'
            : 'bg-gradient-to-b from-[#E8E8FF] via-[#EAE9FF] to-[#F3F1FF]'
          }`}
      >
        {/* Trust Badge */}
        <div className={`flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-20 md:mt-30 rounded-full backdrop-blur-md border
          ${isDark
            ? 'bg-white/10 border-white/10'
            : 'bg-white/60 border-white/80 shadow-xs'
          }`}
        >
          <div className="relative flex size-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
            <span className={`relative inline-flex size-2 rounded-full ${isDark ? 'bg-[#A6FF5D]' : 'bg-green-500'}`}></span>
          </div>
          <p className={`text-xs font-semibold tracking-wide uppercase px-1 ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
            100+ Tools
          </p>
        </div>

        {/* Headline */}
        <h1 className={`text-4xl md:text-[66px] text-center max-w-4xl mt-8 leading-tight font-semibold tracking-tight pb-2
          ${isDark ? 'text-white' : 'text-[#1E2238]'}`}
        >
          Online Tools and Guides for Everyone
        </h1>

        <p className={`text-sm md:text-base text-center max-w-[630px] mt-4 leading-relaxed font-normal
          ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
        >
          We have designed high-impact tools that can give better results. From sleek interfaces to full stack experiences, we bring your brand to life online.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-10">
          <button className={`text-xs md:text-sm px-6 py-3 rounded-xl transition cursor-pointer font-medium shadow-md hover:scale-[1.02] active:scale-95 duration-200
            ${isDark
              ? 'bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-900'
              : 'bg-violet-600 hover:bg-violet-700 text-white'
            }`}
          >
            Get Started
          </button>
          <button className={`text-xs md:text-sm px-5 py-3 rounded-xl transition cursor-pointer font-medium shadow-sm border hover:scale-[1.02] active:scale-95 duration-200
            ${isDark
              ? 'bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800 text-zinc-300'
              : 'bg-white hover:bg-gray-50 border-slate-200 text-slate-700'
            }`}
          >
            Explore Tools
          </button>
        </div>

        {/* Divider */}
        <div className={`w-full max-w-[800px] h-[1px] mt-16 bg-gradient-to-r from-transparent to-transparent opacity-40
          ${isDark ? 'via-[#A6FF5D]' : 'via-violet-300'}`}
        ></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 max-w-[930px] w-full mt-4">
          {[
            { value: '20+', label: 'Years Experience' },
            { value: '12k+', label: 'Projects Completed' },
            { value: '5k+', label: 'Happy Customers' },
            { value: '5+', label: 'Countries' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <h2 className={`font-bold text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {stat.value}
              </h2>
              <p className={`text-xs md:text-sm mt-1 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
