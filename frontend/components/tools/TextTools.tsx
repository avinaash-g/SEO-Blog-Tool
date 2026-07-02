'use client';

import React, { useState } from 'react';

// Shared Copy/Utility Action Control Badge Component
function TextActionControl({ text, onCustomAction, actionLabel }: { text: string; onCustomAction?: () => void; actionLabel?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      {onCustomAction && actionLabel && (
        <button onClick={onCustomAction} className="rounded-lg bg-violet-600 dark:bg-[#A6FF5D] px-3 py-1.5 text-xs font-semibold text-white dark:text-black hover:opacity-95 transition">
          {actionLabel}
        </button>
      )}
      <button onClick={handleCopy} className="rounded-lg border border-gray-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition text-neutral-700 dark:text-neutral-300">
        {copied ? 'Copied ✓' : 'Copy Result'}
      </button>
    </div>
  );
}

// 1. ADVANCED WORD COUNTER
export function WordCounter() {
  const [text, setText] = useState('');
  
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const lines = text.split('\n').filter(l => l.trim() !== '').length;

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Word Counter</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Extract syntax paragraph metric profiles seamlessly.</p>
        </div>
        <TextActionControl text={`Words: ${words} | Characters: ${characters} | Lines: ${lines}`} />
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Paste plain copy textual paragraphs here..." className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-violet-500" />
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-white dark:bg-black border dark:border-neutral-800 rounded-xl">
          <p className="text-xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{words}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Words</p>
        </div>
        <div className="p-3 bg-white dark:bg-black border dark:border-neutral-800 rounded-xl">
          <p className="text-xl font-mono font-bold text-neutral-700 dark:text-neutral-300">{characters}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Characters</p>
        </div>
        <div className="p-3 bg-white dark:bg-black border dark:border-neutral-800 rounded-xl">
          <p className="text-xl font-mono font-bold text-neutral-700 dark:text-neutral-300">{lines}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Lines</p>
        </div>
      </div>
    </div>
  );
}

// 2. ADVANCED CHARACTER COUNTER
export function CharacterCounter() {
  const [text, setText] = useState('');
  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Character Counter</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Verify symbol stream layout sizes accurately.</p>
        </div>
        <TextActionControl text={String(text.length)} />
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Input text code data strings..." className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-violet-500" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-white dark:bg-black border dark:border-neutral-800 rounded-xl">
          <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wide">Gross Space Bound</span>
          <span className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{text.length} Symbols</span>
        </div>
        <div className="p-4 bg-white dark:bg-black border dark:border-neutral-800 rounded-xl">
          <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wide">Clean Variable Space Bound</span>
          <span className="text-2xl font-mono font-bold text-neutral-700 dark:text-neutral-300">{text.replace(/\s/g, '').length} Symbols</span>
        </div>
      </div>
    </div>
  );
}

// 3. ADVANCED CASE CONVERTER
export function CaseConverter() {
  const [text, setText] = useState('Change data metrics configuration layouts safely.');

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Case Converter</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Transform alphanumeric textual visual properties instantly.</p>
        </div>
        <TextActionControl text={text} />
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-violet-500" />
      
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setText(text.toUpperCase())} className="p-2 bg-violet-600 dark:bg-neutral-900 border dark:border-neutral-800 text-white dark:text-[#A6FF5D] font-semibold text-xs rounded-lg uppercase tracking-wider hover:opacity-90">Upper Case</button>
        <button onClick={() => setText(text.toLowerCase())} className="p-2 bg-violet-600 dark:bg-neutral-900 border dark:border-neutral-800 text-white dark:text-[#A6FF5D] font-semibold text-xs rounded-lg uppercase tracking-wider hover:opacity-90">Lower Case</button>
        <button onClick={() => setText(text.replace(/\b\w/g, c => c.toUpperCase()))} className="p-2 bg-violet-600 dark:bg-neutral-900 border dark:border-neutral-800 text-white dark:text-[#A6FF5D] font-semibold text-xs rounded-lg uppercase tracking-wider hover:opacity-90">Title Case</button>
      </div>
    </div>
  );
}

// 4. ADVANCED TEXT REVERSER
export function TextReverser() {
  const [text, setText] = useState('Full Stack Software Architecture');
  const reversed = text.split('').reverse().join('');

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Text Reverser</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Invert characters sequences array matrices paths backward.</p>
        </div>
        <TextActionControl text={reversed} />
      </div>

      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-violet-500" />
      
      <div className="p-4 bg-white dark:bg-black border border-dashed border-gray-200 dark:border-neutral-800 rounded-xl text-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Inverted Active Order Data Output</span>
        <p className="font-mono text-base font-bold text-violet-600 dark:text-[#A6FF5D] break-all">{reversed || 'No Input Data'}</p>
      </div>
    </div>
  );
}

// 5. ADVANCED SLUG GENERATOR
export function SlugGenerator() {
  const [text, setText] = useState('Build high-quality SEO-friendly niche website platforms');
  const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Slug Generator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Normalize H1 asset headers into valid programmatic routing URLs.</p>
        </div>
        <TextActionControl text={slug} />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Article Title Text</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-violet-500" />
      </div>
      
      <div className="p-4 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-xl">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Generated Static URL Route String</span>
        <p className="font-mono text-xs text-violet-600 dark:text-[#A6FF5D] break-all select-all font-semibold">{slug || 'waiting-for-input'}</p>
      </div>
    </div>
  );
}

// Master Main Grid Wrapper Container
// export default function TextToolsWorkspace() {
//   return (
//     <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
//       <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
//         <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
//           <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Text Analytics</div>
//           <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">TEXT PARSER ENG</div>
//         </div>
//       </nav>

//       <main className="mx-auto max-w-4xl px-6 pb-20 pt-24 sm:px-8 text-left">
//         <div className="space-y-2 mb-8">
//           <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Text Manipulators Suite</h1>
//           <p className="text-sm text-gray-500 dark:text-neutral-400">Client side token processing arrays for digital editing operations.</p>
//         </div>

//         <div className="flex flex-col gap-8">
//           <WordCounter />
//           <CharacterCounter />
//           <CaseConverter />
//           <TextReverser />
//           <SlugGenerator />
//         </div>
//       </main>
//     </div>
//   );
// }

//=================================================================================================
export default function TextToolsWorkspace() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Text Analytics</div>
          <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">TEXT PARSER ENG</div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-24 sm:px-8 text-left">
        <div className="space-y-1.5 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-violet-600 dark:text-[#A6FF5D]">Text Manipulators Suite</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">Client side token processing arrays for digital editing operations.</p>
        </div>

        <div className="flex flex-col gap-8">
          <WordCounter />
          <CharacterCounter />
          <CaseConverter />
          <TextReverser />
          <SlugGenerator />
        </div>
      </main>
    </div>
  );
}

// 'use client';
// import { useState } from 'react';

// // 1. WORD COUNTER
// export function WordCounter() {
//   const [text, setText] = useState('');
  
//   const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
//   const characters = text.length;
//   const lines = text.split('\n').filter(l => l.trim() !== '').length;

//   return (
//     <div className="space-y-4">
//       <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Paste plain copy textual paragraphs here..." className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 text-sm focus:outline-none" />
//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div className="p-3 bg-neutral-100/50 dark:bg-neutral-950 border dark:border-neutral-800 rounded-xl">
//           <p className="text-xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{words}</p>
//           <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Words</p>
//         </div>
//         <div className="p-3 bg-neutral-100/50 dark:bg-neutral-950 border dark:border-neutral-800 rounded-xl">
//           <p className="text-xl font-mono font-bold text-gray-700 dark:text-neutral-300">{characters}</p>
//           <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Characters</p>
//         </div>
//         <div className="p-3 bg-neutral-100/50 dark:bg-neutral-950 border dark:border-neutral-800 rounded-xl">
//           <p className="text-xl font-mono font-bold text-gray-700 dark:text-neutral-300">{lines}</p>
//           <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Lines</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 2. CHARACTER COUNTER
// export function CharacterCounter() {
//   const [text, setText] = useState('');
//   return (
//     <div className="space-y-4">
//       <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Input code text strings..." className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 text-sm focus:outline-none" />
//       <div className="grid grid-cols-2 gap-4 text-center">
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border dark:border-neutral-800 rounded-xl">
//           <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wide">Gross Metric Space Boundary</span>
//           <span className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{text.length} Symbols</span>
//         </div>
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border dark:border-neutral-800 rounded-xl">
//           <span className="text-xs font-semibold text-gray-400 block mb-1 uppercase tracking-wide">Clean Character Vector Bounds</span>
//           <span className="text-2xl font-mono font-bold text-gray-700 dark:text-neutral-300">{text.replace(/\s/g, '').length} Symbols</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 3. CASE CONVERTER
// export function CaseConverter() {
//   const [text, setText] = useState('Change data metrics configuration layouts safely.');
//   return (
//     <div className="space-y-4">
//       <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//       <div className="grid grid-cols-3 gap-2">
//         <button onClick={() => setText(text.toUpperCase())} className="p-2 bg-violet-600 text-white font-semibold text-xs rounded-lg dark:bg-neutral-800 dark:text-[#A6FF5D] uppercase tracking-wider">Upper Case</button>
//         <button onClick={() => setText(text.toLowerCase())} className="p-2 bg-violet-600 text-white font-semibold text-xs rounded-lg dark:bg-neutral-800 dark:text-[#A6FF5D] uppercase tracking-wider">Lower Case</button>
//         <button onClick={() => setText(text.replace(/\b\w/g, c => c.toUpperCase()))} className="p-2 bg-violet-600 text-white font-semibold text-xs rounded-lg dark:bg-neutral-800 dark:text-[#A6FF5D] uppercase tracking-wider">Title Case</button>
//       </div>
//     </div>
//   );
// }

// // 4. TEXT REVERSER
// export function TextReverser() {
//   const [text, setText] = useState('Full Stack Software Architecture');
//   const reversed = text.split('').reverse().join('');

//   return (
//     <div className="space-y-4">
//       <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 text-sm focus:outline-none" />
//       <div className="p-4 bg-neutral-100 dark:bg-neutral-950 border border-dashed dark:border-neutral-800 rounded-xl text-center">
//         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Inverted Order Data Stream</span>
//         <p className="font-mono text-base font-bold text-violet-600 dark:text-[#A6FF5D] break-all">{reversed}</p>
//       </div>
//     </div>
//   );
// }

// // 5. SLUG GENERATOR
// export function SlugGenerator() {
//   const [text, setText] = useState('Build high-quality SEO-friendly niche website platforms');
//   const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

//   return (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Article H1 Title/Text</label>
//         <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 text-sm focus:outline-none" />
//       </div>
//       <div className="p-4 bg-neutral-100 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl relative group">
//         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Generated Static URL Slug String</span>
//         <p className="font-mono text-xs text-violet-600 dark:text-[#A6FF5D] break-all select-all pr-12">{slug}</p>
//         <button onClick={() => navigator.clipboard.writeText(slug)} className="absolute top-4 right-4 text-[10px] uppercase font-bold text-gray-400 hover:text-violet-600">Copy</button>
//       </div>
//     </div>
//   );
// }

