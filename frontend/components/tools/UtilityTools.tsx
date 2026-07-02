'use client';

import React, { useState } from 'react';

function UtilActionControl({ copyText, onCustomAction, actionLabel }: { copyText: string; onCustomAction?: () => void; actionLabel?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
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

// 1. ADVANCED AGE CALCULATOR
export function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [ageMetrics, setAgeMetrics] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = (dateVal: string) => {
    setDob(dateVal);
    if (!dateVal) return;
    const today = new Date();
    const birthDate = new Date(dateVal);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    setAgeMetrics({ years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) });
  };

  const copyString = ageMetrics ? `${ageMetrics.years} Years, ${ageMetrics.months} Months, ${ageMetrics.days} Days` : '';

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Age Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Determine chronology tracking timeline metric values components.</p>
        </div>
        <UtilActionControl copyText={copyString} />
      </div>

      <div className="max-w-xs space-y-2">
        <label htmlFor="age-date" className="block text-xs font-semibold uppercase text-gray-400">Pick Date of Birth</label>
        <input id="age-date" type="date" value={dob} onChange={(e) => calculateAge(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black font-medium text-sm text-neutral-800 dark:text-[#A6FF5D] focus:outline-none" />
      </div>

      {ageMetrics ? (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800">
          <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{ageMetrics.years}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Years</p>
          </div>
          <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{ageMetrics.months}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Months</p>
          </div>
          <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{ageMetrics.days}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Days</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400 py-2 font-medium">Initialize calculations timeline framework value parameters above.</p>
      )}
    </div>
  );
}

// 2. ADVANCED PERCENTAGE CALCULATOR
export function PercentageCalculator() {
  const [num, setNum] = useState(45);
  const [total, setTotal] = useState(250);

  const percentage = total ? (Math.max(0, num) / Math.max(1, total)) * 100 : 0;

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Percentage Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Solve relative fraction metrics proportional scales balances ratios.</p>
        </div>
        <UtilActionControl copyText={`${percentage.toFixed(2)}%`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="space-y-2">
          <label htmlFor="pct-num" className="block text-xs font-semibold uppercase text-gray-500">Value Segment Portion</label>
          <input id="pct-num" type="number" value={num} onChange={(e) => setNum(Number(e.target.value) || 0)} className="w-full p-2.5 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="pct-tot" className="block text-xs font-semibold uppercase text-gray-500">Total Structural Aggregate Scale</label>
          <input id="pct-tot" type="number" value={total} onChange={(e) => setTotal(Number(e.target.value) || 1)} className="w-full p-2.5 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Calculated Percentage Proportional Ratio</span>
        <span className="text-3xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{percentage.toFixed(2)}%</span>
      </div>
    </div>
  );
}

// 3. ADVANCED DISCOUNT CALCULATOR
export function DiscountCalculator() {
  const [price, setPrice] = useState(2499);
  const [discount, setDiscount] = useState(20);

  const safePrice = Math.max(0, price);
  const safeDisc = Math.min(100, Math.max(0, discount));
  const save = (safePrice * safeDisc) / 100;
  const total = safePrice - save;

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Discount Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Compute clearance markdown savings and net cost balances values totals.</p>
        </div>
        <UtilActionControl copyText={total.toFixed(2)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="disc-prc" className="block text-xs font-semibold uppercase text-gray-500">Sticker Value Catalog Price (₹)</label>
            <input id="disc-prc" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className="w-full p-2.5 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500">
              <label htmlFor="disc-rng">Markdown Fraction Percentage</label>
              <span className="text-violet-600 dark:text-[#A6FF5D] font-mono font-bold">{safeDisc}%</span>
            </div>
            <input id="disc-rng" type="range" min="0" max="100" value={safeDisc} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
          </div>
        </div>
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 p-4 rounded-xl flex flex-col justify-center items-center text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Net Due Balance Final Cost</p>
          <p className="text-3xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">₹{total.toFixed(2)}</p>
          <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-neutral-900 border dark:border-neutral-800 px-3 py-1 rounded-full mt-2">Saved Net Amount: ₹{save.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

// 4. ADVANCED QR CODE GENERATOR
export function QrGenerator() {
  const [text, setText] = useState('https://toolverse.in');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text || 'https://toolverse.in')}`;

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm text-left">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">QR Code Generator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Map active URLs plain information arrays parameters to vector matrix paths block.</p>
        </div>
        <UtilActionControl copyText={text} />
      </div>

      <div className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <label htmlFor="qr-inp" className="block text-xs font-semibold uppercase text-gray-500">Data Endpoint Address Target / Plain Content</label>
          <input id="qr-inp" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type target endpoint address here..." className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-violet-500" />
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 dark:border-neutral-800 w-fit mx-auto shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt="Active Vector QR Matrix Dynamic Output Visualization Node" className="w-[160px] h-[160px] object-contain" />
        </div>
      </div>
    </div>
  );
}

// 5. ADVANCED PASSWORD GENERATOR
export function PasswordGenerator() {
  const [pass, setPass] = useState('c0mPl3x_StR1ng!');
  const [len, setLen] = useState(16);

  const generate = () => {
    const validLen = Math.min(64, Math.max(8, len));
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let generated = "";
    for (let i = 0; i < validLen; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPass(generated);
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Password Generator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Generate secure character configurations keys matching parameters bounds constraints.</p>
        </div>
        <UtilActionControl copyText={pass} onCustomAction={generate} actionLabel="Generate" />
      </div>

      <div className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase text-gray-500">
            <label htmlFor="pass-rng">Target Cryptographic String Length</label>
            <span className="font-mono text-violet-600 dark:text-[#A6FF5D] font-bold">{len} Characters</span>
          </div>
          <input id="pass-rng" type="range" min="8" max="64" value={len} onChange={(e) => setLen(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
        </div>
        
        <input type="text" readOnly value={pass} aria-label="Generated secure key output display element field text" className="w-full p-3 text-center border font-mono font-bold border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-neutral-800 dark:text-[#A6FF5D]" />
      </div>
    </div>
  );
}

// Master Main Grid Wrapper Container Layout
// export default function UtilityToolsWorkspace() {
//   return (
//     <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
//       <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
//         <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
//           <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Utilities</div>
//           <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">SERVICES LAYER M2</div>
//         </div>
//       </nav>

//       <main className="mx-auto max-w-4xl px-6 pb-20 pt-24 sm:px-8 text-left">
//         <div className="space-y-2 mb-8">
//           <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">General Purpose Toolkits</h1>
//           <p className="text-sm text-gray-500 dark:text-neutral-400">Client side computation helpers built over optimization algorithms pipelines.</p>
//         </div>

//         <div className="flex flex-col gap-8">
//           <AgeCalculator />
//           <PercentageCalculator />
//           <DiscountCalculator />
//           <QrGenerator />
//           <PasswordGenerator />
//         </div>
//       </main>
//     </div>
//   );
// }

//=============================================================================================
export default function UtilityToolsWorkspace() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Utilities</div>
          <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">SERVICES LAYER M2</div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-24 sm:px-8 text-left">
        <div className="space-y-1.5 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-violet-600 dark:text-[#A6FF5D]">General Purpose Toolkits</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">Client side computation helpers built over optimization algorithms pipelines.</p>
        </div>

        <div className="flex flex-col gap-8">
          <AgeCalculator />
          <PercentageCalculator />
          <DiscountCalculator />
          <QrGenerator />
          <PasswordGenerator />
        </div>
      </main>
    </div>
  );
}

// 'use client';
// import { useState } from 'react';

// // 1. AGE CALCULATOR
// export function AgeCalculator() {
//   const [dob, setDob] = useState('');
//   const [ageMetrics, setAgeMetrics] = useState<{ years: number; months: number; days: number } | null>(null);

//   const calculateAge = (dateVal: string) => {
//     setDob(dateVal);
//     if (!dateVal) return;
//     const today = new Date();
//     const birthDate = new Date(dateVal);
    
//     let years = today.getFullYear() - birthDate.getFullYear();
//     let months = today.getMonth() - birthDate.getMonth();
//     let days = today.getDate() - birthDate.getDate();

//     if (months < 0 || (months === 0 && days < 0)) {
//       years--;
//       months += 12;
//     }
//     if (days < 0) {
//       const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
//       days += prevMonth.getDate();
//       months--;
//     }

//     setAgeMetrics({ years, months, days });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="max-w-md mx-auto space-y-2">
//         <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400 text-center">Select Date of Birth</label>
//         <input type="date" value={dob} onChange={(e) => calculateAge(e.target.value)} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 text-center font-medium focus:outline-none focus:ring-2 focus:ring-violet-500" />
//       </div>

//       {ageMetrics ? (
//         <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
//           <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
//             <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{ageMetrics.years}</p>
//             <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase">Years</p>
//           </div>
//           <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
//             <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{ageMetrics.months}</p>
//             <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase">Months</p>
//           </div>
//           <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
//             <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{ageMetrics.days}</p>
//             <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 uppercase">Days</p>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-sm text-gray-400 py-4 font-medium">Please pick a valid timeline value above.</p>
//       )}
//     </div>
//   );
// }

// // 2. PERCENTAGE CALCULATOR
// export function PercentageCalculator() {
//   const [num, setNum] = useState(45);
//   const [total, setTotal] = useState(250);

//   const percentage = total ? (num / total) * 100 : 0;

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Value Segment</label>
//           <input type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Total Scale Matrix</label>
//           <input type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//       </div>
//       <div className="p-4 bg-violet-600 dark:bg-neutral-950 border border-violet-700 dark:border-neutral-800 rounded-xl text-center">
//         <span className="text-xs font-medium text-white/80 dark:text-neutral-400 block mb-1">Calculated Percentage Ratio</span>
//         <span className="text-3xl font-mono font-bold text-white dark:text-[#A6FF5D]">{percentage.toFixed(2)}%</span>
//       </div>
//     </div>
//   );
// }

// // 3. DISCOUNT CALCULATOR
// export function DiscountCalculator() {
//   const [price, setPrice] = useState(2499);
//   const [discount, setDiscount] = useState(20);

//   const save = (price * discount) / 100;
//   const total = price - save;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="space-y-4">
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Sticker Value Price (₹)</label>
//           <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//             <label>Markdown Percentage</label>
//             <span className="text-violet-600 dark:text-[#A6FF5D] font-mono">{discount}%</span>
//           </div>
//           <input type="range" min="1" max="99" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//         </div>
//       </div>
//       <div className="bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 p-6 rounded-xl flex flex-col justify-center items-center text-center">
//         <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Net Clearance Cost</p>
//         <p className="text-4xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">₹{total.toFixed(2)}</p>
//         <p className="text-xs font-medium text-green-600 dark:text-emerald-400 mt-2 bg-green-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-green-100 dark:border-emerald-900/40">
//           Saved Net Amount: ₹{save.toFixed(2)}
//         </p>
//       </div>
//     </div>
//   );
// }

// // 4. QR CODE GENERATOR
// export function QrGenerator() {
//   const [text, setText] = useState('https://toolverse.in');
//   const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;

//   return (
//     <div className="space-y-6 max-w-md mx-auto">
//       <div className="space-y-2">
//         <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Data Endpoint Target / Plain Text</label>
//         <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type target endpoint address here..." className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//       </div>
//       <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-fit mx-auto dark:bg-neutral-950 dark:border-neutral-800">
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img src={qrUrl} alt="Active Vector QR Matrix Output" className="w-[180px] h-[180px] object-contain" />
//       </div>
//     </div>
//   );
// }

// // 5. PASSWORD GENERATOR
// export function PasswordGenerator() {
//   const [pass, setPass] = useState('c0mPl3x_StR1ng!');
//   const [len, setLen] = useState(16);
//   const [copied, setCopied] = useState(false);

//   const generate = () => {
//     const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
//     let generated = "";
//     for (let i = 0; i < len; i++) {
//       generated += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setPass(generated);
//     setCopied(false);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(pass);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="space-y-6 max-w-xl mx-auto">
//       <div className="space-y-2">
//         <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//           <label>Target String Length</label>
//           <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{len} Alpha-characters</span>
//         </div>
//         <input type="range" min="8" max="64" value={len} onChange={(e) => setLen(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//       </div>
      
//       <div className="flex gap-2">
//         <input type="text" readOnly value={pass} className="flex-1 p-3 text-center border font-mono font-bold border-gray-200 dark:border-neutral-800 rounded-lg bg-neutral-100 dark:bg-neutral-950 text-black dark:text-[#A6FF5D]" />
//         <button onClick={handleCopy} className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 text-xs font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-700 transition">
//           {copied ? 'Copied ✓' : 'Copy'}
//         </button>
//       </div>

//       <button onClick={generate} className="w-full py-3 bg-violet-600 text-white font-bold text-sm tracking-wider uppercase rounded-lg hover:bg-violet-700 transition dark:bg-[#A6FF5D] dark:text-black dark:hover:opacity-90">
//         Re-generate Complex String Array
//       </button>
//     </div>
//   );
// }

