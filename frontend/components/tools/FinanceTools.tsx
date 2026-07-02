

'use client';

import React, { useState, useMemo } from 'react';

// ============================================================================
// TYPE DEFINITIONS & STRUCTURES
// ============================================================================
type EmiScheduleRow = {
  month: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
};

// ============================================================================
// COMPACT MATH & UTILITY REFACTOR HELPERS
// ============================================================================
const clamp = (value: number, min: number, max: number) => 
  Math.min(max, Math.max(min, value));

const formatINR = (value: number) => {
  const num = Number.isFinite(value) ? value : 0;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

const triggerCSVDownload = (filename: string, rows: Record<string, string | number | boolean>[]) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row => headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};
const emiCalc = (p: number, r: number, t: number) => {
  const principal = Math.max(0, p);
  const totalMonths = Math.max(1, t);
  const monthlyRate = Math.max(0, r) / 12 / 100;

  const emi = monthlyRate > 0 
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : principal / totalMonths;

  let balance = principal;
  const schedule: EmiScheduleRow[] = Array.from({ length: totalMonths }, (_, idx) => {
    const month = idx + 1;
    const interestPaid = balance * monthlyRate;
    const principalPaid = Math.min(emi - interestPaid, balance);
    balance = Math.max(0, balance - principalPaid);

    return {
      month,
      emi: Number(emi.toFixed(2)),
      principalPaid: Number(principalPaid.toFixed(2)),
      interestPaid: Number(interestPaid.toFixed(2)),
      balance: Number(balance.toFixed(2))
    };
  });

  const totalAmount = emi * totalMonths;
  const totalInterest = totalAmount - principal;

  return { emi, totalAmount, totalInterest, schedule };
};

const sipCalc = (m: number, r: number, y: number) => {
  const monthly = Math.max(0, m);
  const rate = Math.max(0, r);
  const years = Math.max(1, y);
  const totalMonths = years * 12;
  const periodicRate = rate / 12 / 100;

  const totalInvested = monthly * totalMonths;
  const maturityValue = periodicRate > 0
    ? monthly * ((Math.pow(1 + periodicRate, totalMonths) - 1) / periodicRate) * (1 + periodicRate)
    : totalInvested;

  const estReturns = maturityValue - totalInvested;
  const cagr = totalInvested > 0 ? (Math.pow(maturityValue / totalInvested, 1 / years) - 1) * 100 : 0;

  return { totalInvested, maturityValue, estReturns, cagr };
};

// ============================================================================
// SHAREABLE CORE SUB-COMPONENTS
// ============================================================================
function ActionControls({ copyText, onExport }: { copyText: string; onExport: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        aria-label="Copy key numerical data output results"
        className="rounded-lg border border-gray-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition text-neutral-700 dark:text-neutral-300"
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
      <button
        onClick={onExport}
        aria-label="Export complete row matrices data configuration to CSV"
        className="rounded-lg bg-violet-600 dark:bg-[#A6FF5D] px-3 py-1.5 text-xs font-semibold text-white dark:text-black hover:opacity-95 transition"
      >
        Export CSV
      </button>
    </div>
  );
}

// ============================================================================
// 1. EMI CALCULATOR COMPONENT
// ============================================================================
export function EmiCalculator() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(8.5);
  const [t, setT] = useState(24);
  const [showSchedule, setShowSchedule] = useState(false);

  const data = useMemo(() => emiCalc(p, r, t), [p, r, t]);

  const handleCsvExport = () => {
    triggerCSVDownload('emi_amortization_schedule.csv', data.schedule.map(row => ({
      Month: row.month,
      EMI: row.emi,
      PrincipalPaid: row.principalPaid,
      InterestPaid: row.interestPaid,
      OutstandingBalance: row.balance
    })));
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">EMI Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Loan profile matrix with active breakdown paths.</p>
        </div>
        <ActionControls copyText={data.emi.toFixed(2)} onExport={handleCsvExport} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
            <label htmlFor="emi-p">Principal Amount</label>
            <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{formatINR(p)}</span>
          </div>
          <input id="emi-p" type="number" value={p} onChange={(e) => setP(clamp(Number(e.target.value) || 0, 10000, 50000000))} aria-label="EMI Principal Amount text entry input box" className="w-full p-2.5 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-violet-500" />
          <input type="range" min="10000" max="5000000" step="10000" value={p} onChange={(e) => setP(Number(e.target.value))} aria-label="EMI Principal slider tracking node control element" className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
            <label htmlFor="emi-r">Interest Rate (%)</label>
            <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{r}%</span>
          </div>
          <input id="emi-r" type="number" step="0.1" value={r} onChange={(e) => setR(clamp(Number(e.target.value) || 0, 0, 30))} aria-label="EMI Interest rate text percentage input box" className="w-full p-2.5 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
          <input type="range" min="1" max="30" step="0.1" value={r} onChange={(e) => setR(Number(e.target.value))} aria-label="EMI Interest slider tracking metric node control element" className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
            <label htmlFor="emi-t">Tenure (Months)</label>
            <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{t} Mo</span>
          </div>
          <input id="emi-t" type="number" value={t} onChange={(e) => setT(clamp(Number(e.target.value) || 1, 1, 360))} aria-label="EMI Month tenure length numerical data box" className="w-full p-2.5 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
          <input type="range" min="3" max="360" step="1" value={t} onChange={(e) => setT(Number(e.target.value))} aria-label="EMI Month timeline range slider node tracking asset control" className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800">
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Monthly EMI</p>
          <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{formatINR(data.emi)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Interest</p>
          <p className="text-2xl font-mono font-bold text-neutral-800 dark:text-neutral-200">{formatINR(data.totalInterest)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Payable</p>
          <p className="text-2xl font-mono font-bold text-neutral-800 dark:text-neutral-100">{formatINR(data.totalAmount)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input id="emi-toggle" type="checkbox" checked={showSchedule} onChange={(e) => setShowSchedule(e.target.checked)} className="rounded text-violet-600 focus:ring-0 cursor-pointer h-4 w-4" />
        <label htmlFor="emi-toggle" className="text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer font-medium select-none">Show amortization data structure table mapping</label>
      </div>

      {showSchedule && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black mt-2">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-50 dark:bg-neutral-900 text-gray-400 uppercase tracking-wider border-b dark:border-neutral-800">
              <tr>
                <th className="px-4 py-2.5">Month</th>
                <th className="px-4 py-2.5">EMI</th>
                <th className="px-4 py-2.5">Principal</th>
                <th className="px-4 py-2.5">Interest</th>
                <th className="px-4 py-2.5">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
              {data.schedule.slice(0, 12).map((row) => (
                <tr key={row.month} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30">
                  <td className="px-4 py-2 text-neutral-400">{row.month}</td>
                  <td className="px-4 py-2 font-bold">{formatINR(row.emi)}</td>
                  <td className="px-4 py-2 text-green-600 dark:text-emerald-400">{formatINR(row.principalPaid)}</td>
                  <td className="px-4 py-2 text-red-500">{formatINR(row.interestPaid)}</td>
                  <td className="px-4 py-2">{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.schedule.length > 12 && (
            <p className="text-[10px] text-gray-400 text-center py-1.5 border-t dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/10">Truncated display visualization sequence. Export CSV for total roadmap layout tracking analysis.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. SIP CALCULATOR COMPONENT
// ============================================================================
export function SipCalculator() {
  const [m, setM] = useState(10000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(10);

  const data = useMemo(() => sipCalc(m, r, y), [m, r, y]);

  const handleCsvExport = () => {
    triggerCSVDownload('sip_projections.csv', [{
      MonthlyDeposit: m, ExpectedReturnPercent: r, HorizonYears: y,
      TotalInvested: data.totalInvested, MaturityValue: data.maturityValue,
      EstReturns: data.estReturns, CAGRPercent: data.cagr.toFixed(2)
    }]);
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">SIP Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Compounding growth arrays tracker configuration tool metrics.</p>
        </div>
        <ActionControls copyText={data.maturityValue.toFixed(0)} onExport={handleCsvExport} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
            <label htmlFor="sip-m">Monthly Deposit</label>
            <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{formatINR(m)}</span>
          </div>
          <input id="sip-m" type="number" value={m} onChange={(e) => setM(clamp(Number(e.target.value) || 0, 500, 200000))} aria-label="SIP Monthly investment allocation input field" className="w-full p-2.5 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
          <input type="range" min="500" max="200000" step="500" value={m} onChange={(e) => setM(Number(e.target.value))} aria-label="SIP Monthly allocation balance slider selector control tracker element" className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
            <label htmlFor="sip-r">Expected Returns (%)</label>
            <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{r}%</span>
          </div>
          <input id="sip-r" type="number" value={r} onChange={(e) => setR(clamp(Number(e.target.value) || 0, 0, 30))} aria-label="SIP Interest percentage calculation field input box text" className="w-full p-2.5 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
          <input type="range" min="1" max="30" step="0.5" value={r} onChange={(e) => setR(Number(e.target.value))} aria-label="SIP Target expectation yield slider control node element tracking indicator" className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
            <label htmlFor="sip-y">Time Horizon (Years)</label>
            <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{y} Years</span>
          </div>
          <input id="sip-y" type="number" value={y} onChange={(e) => setY(clamp(Number(e.target.value) || 1, 1, 40))} aria-label="SIP Duration length evaluation field input text numeric parameter box" className="w-full p-2.5 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
          <input type="range" min="1" max="40" step="1" value={y} onChange={(e) => setY(Number(e.target.value))} aria-label="SIP Years tracking slider dynamic boundary element tool matrix control node" className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D]" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800">
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Invested</p>
          <p className="text-lg font-mono font-bold text-neutral-700 dark:text-neutral-300">{formatINR(data.totalInvested)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Returns Yield</p>
          <p className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatINR(data.estReturns)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Maturity Target</p>
          <p className="text-lg font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{formatINR(data.maturityValue)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Calculated CAGR</p>
          <p className="text-lg font-mono font-bold text-neutral-800 dark:text-neutral-100">{data.cagr.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. GST CALCULATOR COMPONENT
// ============================================================================
export function GstCalculator() {
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(18);

  const data = useMemo(() => {
    const amt = clamp(amount, 0, 100000000);
    const gst = (amt * rate) / 100;
    return { gstAmount: gst, netAmount: amt + gst };
  }, [amount, rate]);

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">GST Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Base configuration value taxation addition metrics system profiles.</p>
        </div>
        <ActionControls copyText={data.netAmount.toFixed(2)} onExport={() => triggerCSVDownload('gst_computation.csv', [{ Base: amount, Rate: rate, Tax: data.gstAmount, Gross: data.netAmount }])} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="gst-amt" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Base Net Amount</label>
          <input id="gst-amt" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} aria-label="GST Base computational valuation amount entry space input box text" className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-violet-500" />
        </div>
        <div className="space-y-2">
          <label htmlFor="gst-rate" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">GST Slab Rate</label>
          <select id="gst-rate" value={rate} onChange={(e) => setRate(Number(e.target.value))} aria-label="GST Percentage option category dropdown selection selector element menu node" className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-sm focus:outline-none">
            <option value="5">5% Standard Niche</option>
            <option value="12">12% Economy Niche</option>
            <option value="18">18% Default Product Services</option>
            <option value="28">28% Premium Luxury</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800 text-center">
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Tax Portion</p>
          <p className="text-2xl font-mono font-bold text-neutral-700 dark:text-neutral-300">{formatINR(data.gstAmount)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Gross Total</p>
          <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{formatINR(data.netAmount)}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. FD CALCULATOR COMPONENT
// ============================================================================
export function FdCalculator() {
  const [p, setP] = useState(100000);
  const [r, setR] = useState(7.1);
  const [t, setT] = useState(5);

  const data = useMemo(() => {
    const principal = clamp(p, 0, 100000000);
    const rate = clamp(r, 0, 50);
    const timeline = clamp(t, 0, 100);
    const maturity = principal * Math.pow(1 + rate / 100, timeline);
    return { maturity, interest: maturity - principal };
  }, [p, r, t]);

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">FD Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Fixed Deposit compound analysis projection workspace modules dashboard.</p>
        </div>
        <ActionControls copyText={data.maturity.toFixed(0)} onExport={() => triggerCSVDownload('fd_maturity_records.csv', [{ Capital: p, YieldRate: r, TimelineYears: t, InterestEarned: data.interest, TotalMaturity: data.maturity }])} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="fd-p" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Principal Deposit</label>
          <input id="fd-p" type="number" value={p} onChange={(e) => setP(Number(e.target.value))} aria-label="FD Investment principal capital configuration range field value entry text node box input" className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="fd-r" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Rate of Interest (%)</label>
          <input id="fd-r" type="number" step="0.05" value={r} onChange={(e) => setR(Number(e.target.value))} aria-label="FD Percentage rate interest evaluation index variable field text option box code" className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="fd-t" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Duration (Years)</label>
          <input id="fd-t" type="number" value={t} onChange={(e) => setT(Number(e.target.value))} aria-label="FD Lock in year period integer value parameter block evaluation box element input" className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800 text-center">
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Interest Earned</p>
          <p className="text-2xl font-mono font-bold text-neutral-700 dark:text-neutral-300">{formatINR(data.interest)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Maturity Yield</p>
          <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{formatINR(data.maturity)}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. LOAN CALCULATOR COMPONENT
// ============================================================================
export function LoanCalculator() {
  const [p, setP] = useState(1000000);
  const [r, setR] = useState(9.5);
  const [y, setY] = useState(15);

  const data = useMemo(() => {
    const principal = clamp(p, 0, 100000000);
    const rate = clamp(r, 0, 100);
    const years = clamp(y, 0, 50);
    const totalInterest = (principal * rate * years) / 100;
    return { totalInterest, totalPayable: principal + totalInterest };
  }, [p, r, y]);

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Simple Loan Calculator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Flat linear accounting allocations evaluation planning module paths matrix.</p>
        </div>
        <ActionControls copyText={data.totalPayable.toFixed(0)} onExport={() => triggerCSVDownload('simple_loan_projection.csv', [{ Principal: p, InterestRate: r, TermYears: y, AccumInterest: data.totalInterest, CumulativePayable: data.totalPayable }])} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="loan-p" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Capital Target</label>
          <input id="loan-p" type="number" value={p} onChange={(e) => setP(Number(e.target.value))} aria-label="Loan Base principal structural target parameter input text field value block" className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="loan-r" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Annual Yield (%)</label>
          <input id="loan-r" type="number" step="0.25" value={r} onChange={(e) => setR(Number(e.target.value))} aria-label="Loan Annual static percentage yield validation input tracking text code box element" className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="loan-y" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Amortization Period (Years)</label>
          <input id="loan-y" type="number" value={y} onChange={(e) => setY(Number(e.target.value))} aria-label="Loan Duration years amortization timeline target calculation field text entry grid" className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800 text-center">
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Interest Debt</p>
          <p className="text-2xl font-mono font-bold text-neutral-700 dark:text-neutral-300">{formatINR(data.totalInterest)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Allocation</p>
          <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">{formatINR(data.totalPayable)}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN MASTER CONTAINER IMPLEMENTATION
// ============================================================================
// export default function FinanceTools() {
//   return (
//     <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
//       {/* PRD Layout Configuration Requirement: 
//         Top fixed semantic structural navigation anchor wrapper with absolute alignment space layers.
//       */}
//       <nav aria-label="Internal module platform directory navbar segment" className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
//         <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
//           <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Studio</div>
//           <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">WORKSPACE CONTEXT MODE</div>
//         </div>
//       </nav>

//       {/* Structural padding buffer zone matching your fixed navbar configuration height variables 
//         preventing any layout elements overlapping down viewport grids. Content is perfectly left-aligned.
//       */}
//       <main className="mx-auto max-w-5xl px-6 pb-20 pt-24 sm:px-8 text-left">
//         <div className="space-y-4 mb-8">
//           <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Finance Workspace</h1>
//           <p className="text-sm text-gray-500 dark:text-neutral-400 max-w-2xl">
//             Advanced analytical asset tracking matrix bundle with client side runtime math validation threads[cite: 19]. Fully compatible with dynamic internal layouts.
//           </p>
//         </div>

//         <div className="flex flex-col gap-8">
//           <EmiCalculator />
//           <SipCalculator />
//           <GstCalculator />
//           <FdCalculator />
//           <LoanCalculator />
//         </div>
//       </main>
//     </div>
//   );
// }
//============================================================
export default function FinanceTools() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
      <nav aria-label="Internal module platform directory navbar segment" className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Studio</div>
          <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">WORKSPACE CONTEXT MODE</div>
        </div>
      </nav>

      {/* Spacing alignment matches without background blocks */}
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-24 sm:px-8 text-left">
        <div className="space-y-1.5 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-violet-600 dark:text-[#A6FF5D]">Finance Workspace</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400 max-w-2xl">
            Advanced analytical asset tracking matrix bundle with client side runtime math validation threads.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <EmiCalculator />
          <SipCalculator />
          <GstCalculator />
          <FdCalculator />
          <LoanCalculator />
        </div>
      </main>
    </div>
  );
}

// 'use client';
// import { useState } from 'react';

// // 1. EMI CALCULATOR
// export function EmiCalculator() {
//   const [p, setP] = useState(500000);
//   const [r, setR] = useState(8.5);
//   const [t, setT] = useState(24);

//   const monthlyRate = r / 12 / 100;
//   const emi = monthlyRate ? (p * monthlyRate * Math.pow(1 + monthlyRate, t)) / (Math.pow(1 + monthlyRate, t) - 1) : p / t;
//   const totalAmount = emi * t;
//   const totalInterest = totalAmount - p;

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//             <label>Principal Amount</label>
//             <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">₹{p.toLocaleString()}</span>
//           </div>
//           <input type="number" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-violet-500" />
//           <input type="range" min="10000" max="5000000" step="10000" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//         </div>
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//             <label>Interest Rate</label>
//             <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{r}%</span>
//           </div>
//           <input type="number" step="0.1" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-violet-500" />
//           <input type="range" min="1" max="30" step="0.1" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//         </div>
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//             <label>Tenure (Months)</label>
//             <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{t} Mo</span>
//           </div>
//           <input type="number" value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-violet-500" />
//           <input type="range" min="3" max="360" step="1" value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
//         <div className="p-4 bg-violet-50 dark:bg-neutral-950 border border-violet-100 dark:border-neutral-800 rounded-xl text-center">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mb-1">Monthly Payout (EMI)</p>
//           <p className="text-2xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">₹{emi.toFixed(2)}</p>
//         </div>
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mb-1">Total Interest</p>
//           <p className="text-2xl font-mono font-bold text-gray-800 dark:text-neutral-200">₹{totalInterest.toFixed(0)}</p>
//         </div>
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mb-1">Overall Principle + Interest</p>
//           <p className="text-2xl font-mono font-bold text-gray-800 dark:text-neutral-200">₹{totalAmount.toFixed(0)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 2. SIP CALCULATOR
// export function SipCalculator() {
//   const [m, setM] = useState(10000);
//   const [r, setR] = useState(12);
//   const [y, setY] = useState(10);

//   const i = r / 12 / 100;
//   const months = y * 12;
//   const totalInvested = m * months;
//   const maturityValue = m * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
//   const estReturns = maturityValue - totalInvested;

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//             <label>Monthly Deposit</label>
//             <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">₹{m.toLocaleString()}</span>
//           </div>
//           <input type="number" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//           <input type="range" min="500" max="200000" step="500" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//         </div>
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//             <label>Expected Returns</label>
//             <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{r}%</span>
//           </div>
//           <input type="number" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//           <input type="range" min="1" max="30" step="0.5" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//         </div>
//         <div className="space-y-2">
//           <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
//             <label>Time Period</label>
//             <span className="font-mono text-violet-600 dark:text-[#A6FF5D]">{y} Years</span>
//           </div>
//           <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//           <input type="range" min="1" max="40" step="1" value={y} onChange={(e) => setY(Number(e.target.value))} className="w-full h-1 accent-violet-600 dark:accent-[#A6FF5D] bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mb-1">Total Invested</p>
//           <p className="text-xl font-mono font-bold text-gray-800 dark:text-neutral-200">₹{totalInvested.toLocaleString()}</p>
//         </div>
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl text-center">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mb-1">Est. Wealth Returns</p>
//           <p className="text-xl font-mono font-bold text-gray-800 dark:text-neutral-200">₹{estReturns.toFixed(0)}</p>
//         </div>
//         <div className="p-4 bg-violet-50 dark:bg-neutral-950 border border-violet-100 dark:border-neutral-800 rounded-xl text-center">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mb-1">Total Maturity Value</p>
//           <p className="text-xl font-mono font-bold text-violet-600 dark:text-[#A6FF5D]">₹{maturityValue.toFixed(0)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 3. GST CALCULATOR
// export function GstCalculator() {
//   const [amount, setAmount] = useState(5000);
//   const [rate, setRate] = useState(18);

//   const gstAmount = (amount * rate) / 100;
//   const netAmount = amount + gstAmount;

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Base Net Amount</label>
//           <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">GST Slab Rate</label>
//           <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 text-sm focus:outline-none">
//             <option value="5">5% Standard Niche</option>
//             <option value="12">12% Economy Niche</option>
//             <option value="18">18% Default Product Services</option>
//             <option value="28">28% Premium Luxury</option>
//           </select>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-neutral-800 text-center">
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400">Calculated GST Tax Portion</p>
//           <p className="text-2xl font-mono font-bold text-gray-700 dark:text-neutral-300">₹{gstAmount.toFixed(2)}</p>
//         </div>
//         <div className="p-4 bg-violet-600 text-white dark:bg-neutral-950 border border-violet-700 dark:border-neutral-800 rounded-xl">
//           <p className="text-xs font-medium opacity-85 dark:text-neutral-400">Total Final Gross Cost</p>
//           <p className="text-2xl font-mono font-bold dark:text-[#A6FF5D]">₹{netAmount.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 4. FD CALCULATOR
// export function FdCalculator() {
//   const [p, setP] = useState(100000);
//   const [r, setR] = useState(7.1);
//   const [t, setT] = useState(5);

//   const maturity = p * Math.pow(1 + r / 100, t);
//   const interest = maturity - p;

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Principal Deposit</label>
//           <input type="number" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Rate of Interest (%)</label>
//           <input type="number" step="0.05" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Duration (Years)</label>
//           <input type="number" value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-neutral-800 text-center">
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400">Interest Earned</p>
//           <p className="text-2xl font-mono font-bold text-gray-700 dark:text-neutral-300">₹{interest.toFixed(0)}</p>
//         </div>
//         <div className="p-4 bg-violet-600 text-white dark:bg-neutral-950 border border-violet-700 dark:border-neutral-800 rounded-xl">
//           <p className="text-xs font-medium opacity-80 dark:text-neutral-400">Maturity Returns Amount</p>
//           <p className="text-2xl font-mono font-bold dark:text-[#A6FF5D]">₹{maturity.toFixed(0)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 5. LOAN CALCULATOR
// export function LoanCalculator() {
//   const [p, setP] = useState(1000000);
//   const [r, setR] = useState(9.5);
//   const [y, setY] = useState(15);

//   const totalInterest = (p * r * y) / 100;
//   const totalPayable = p + totalInterest;

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Capital Target</label>
//           <input type="number" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Annual Percentage Yield (%)</label>
//           <input type="number" step="0.25" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//         <div className="space-y-2">
//           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Amortization Period (Years)</label>
//           <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} className="w-full p-3 text-sm border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 focus:outline-none" />
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-neutral-800 text-center">
//         <div className="p-4 bg-neutral-100/50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl">
//           <p className="text-xs font-medium text-gray-500 dark:text-neutral-400">Interest Debt</p>
//           <p className="text-2xl font-mono font-bold text-gray-700 dark:text-neutral-300">₹{totalInterest.toFixed(0)}</p>
//         </div>
//         <div className="p-4 bg-violet-600 text-white dark:bg-neutral-950 border border-violet-700 dark:border-neutral-800 rounded-xl">
//           <p className="text-xs font-medium opacity-80 dark:text-neutral-400">Total Structural Allocation</p>
//           <p className="text-2xl font-mono font-bold dark:text-[#A6FF5D]">₹{totalPayable.toFixed(0)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

