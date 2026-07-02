"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Zap, LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = activeTab === "signin" ? "/api/auth/login" : "/api/auth/register";
    const payload = activeTab === "signin" ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Authentication failed.");
      }

      localStorage.setItem("token", data.token);
      router.push("/tools");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected server error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputWrap = (field: string) =>
    `relative rounded-xl border transition-all duration-200 bg-gray-50 dark:bg-gray-900 ${
      focusedField === field
        ? "border-violet-600 ring-2 ring-violet-600/10 dark:border-violet-400"
        : "border-gray-200 dark:border-gray-700"
    }`;

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#F9FAFB] dark:bg-[#08080A] p-4 transition-colors duration-300 overflow-hidden">
      
      {/* ── STATIC BACKGROUND ENHANCEMENTS LAYER ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* -- Light Mode Static Blobs -- */}
        <div className="dark:hidden">
          {/* Top Right (shifting to center) - Soft Violet */}
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-violet-200/50 blur-[120px]" />
          
          {/* Bottom Left (shifting to center) - Gentle Pink */}
          <div className="absolute -bottom-40 -left-20 w-[700px] h-[700px] rounded-full bg-pink-100/60 blur-[140px]" />
        </div>

        {/* -- Dark Mode Static Blobs -- */}
        <div className="hidden dark:block">
          {/* Top Right (shifting to center) - Deep Indigo */}
          <div className="absolute -top-32 -right-10 w-[550px] h-[550px] rounded-full bg-indigo-950/50 blur-[110px]" />
          
          {/* Bottom Left (shifting to center) - Subtle Slate */}
          <div className="absolute -bottom-40 -left-10 w-[650px] h-[650px] rounded-full bg-slate-900/40 blur-[130px]" />
        </div>
      </div>

      {/* ── Central Login Workspace Card ── */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#101014]/90 rounded-2xl border border-gray-200/70 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm flex overflow-hidden min-h-[500px] transition-all duration-300">
        
        {/* ── Internal Mini Sidebar Navigation ── */}
        <div className="w-20 sm:w-24 bg-gray-50/70 dark:bg-[#141419]/80 border-r border-gray-100 dark:border-zinc-800/60 flex flex-col items-center justify-between py-6 flex-shrink-0">
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Logo */}
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-600/10 hover:scale-105 transition-transform cursor-pointer">
              <Zap size={18} className="text-white fill-current" />
            </div>

            {/* Navigation Tabs */}
            <nav className="flex flex-col gap-3 w-full px-2 sm:px-3">
              <button
                type="button"
                onClick={() => { setActiveTab("signin"); setError(null); }}
                className={`flex flex-col items-center justify-center gap-1 py-3 w-full rounded-xl text-[10px] font-medium transition-all ${
                  activeTab === "signin"
                    ? "bg-white dark:bg-zinc-800/90 text-violet-600 dark:text-violet-400 shadow-xs border border-gray-100 dark:border-zinc-700/50"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
                }`}
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("signup"); setError(null); }}
                className={`flex flex-col items-center justify-center gap-1 py-3 w-full rounded-xl text-[10px] font-medium transition-all ${
                  activeTab === "signup"
                    ? "bg-white dark:bg-zinc-800/90 text-violet-600 dark:text-violet-400 shadow-xs border border-gray-100 dark:border-zinc-700/50"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
                }`}
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </button>
            </nav>
          </div>

          <span className="text-[10px] text-gray-300 dark:text-zinc-700 font-semibold tracking-wider uppercase transform -rotate-90 sm:rotate-0">
            
          </span>
        </div>

        {/* ── Dynamic Form Panel ── */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center bg-white/50 dark:bg-transparent">
          <div className="space-y-1 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {activeTab === "signin" ? "Welcome back" : "Get started"}
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 text-sm">
              {activeTab === "signin" 
                ? "Sign in to your Toolverse workspace." 
                : "Create your account to start building."}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Only shows up during Sign Up) */}
            {activeTab === "signup" && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Full Name</label>
                <div className={inputWrap("name")}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Alex Carter"
                    required={activeTab === "signup"}
                    className="w-full px-4 py-2.5 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-xl outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Email address</label>
              <div className={inputWrap("email")}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2.5 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-xl outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Password</label>
                {activeTab === "signin" && (
                  <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className={inputWrap("password")}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-xl outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3 mt-2 rounded-xl font-medium text-sm transition-all bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-600/15 hover:shadow-violet-600/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  {activeTab === "signin" ? "Sign in" : "Create account"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Micro Footer */}
          <p className="text-center text-[11px] text-gray-400 dark:text-zinc-600 mt-6">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-600 dark:hover:text-zinc-300 transition-colors">Terms</Link>
            {" "}&amp;{" "}
            <Link href="/privacy" className="underline hover:text-gray-600 dark:hover:text-zinc-300 transition-colors">Privacy</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff, ArrowRight, Zap, LogIn, UserPlus } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const endpoint = activeTab === "signin" ? "/api/auth/login" : "/api/auth/register";
//     const payload = activeTab === "signin" ? { email, password } : { name, email, password };

//     try {
//       const response = await fetch(`http://localhost:5000${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Authentication failed.");
//       }

//       localStorage.setItem("token", data.token);
//       router.push("/tools");
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unexpected server error occurred.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const inputWrap = (field: string) =>
//     `relative rounded-xl border transition-all duration-200 bg-gray-50 dark:bg-gray-900 ${
//       focusedField === field
//         ? "border-violet-600 ring-2 ring-violet-600/10 dark:border-violet-400"
//         : "border-gray-200 dark:border-gray-700"
//     }`;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4 transition-colors duration-300">
//       <div className="w-full max-w-2xl bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex overflow-hidden min-h-[500px]">
        
//         {/* ── Internal Mini Sidebar Navigation ── */}
//         <div className="w-20 sm:w-24 bg-gray-50 dark:bg-[#181818] border-r border-gray-100 dark:border-gray-800 flex flex-col items-center justify-between py-6 flex-shrink-0">
//           <div className="flex flex-col items-center gap-8 w-full">
//             {/* Logo */}
//             <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-sm">
//               <Zap size={18} className="text-white fill-current" />
//             </div>

//             {/* Navigation Tabs */}
//             <nav className="flex flex-col gap-3 w-full px-2 sm:px-3">
//               <button
//                 type="button"
//                 onClick={() => { setActiveTab("signin"); setError(null); }}
//                 className={`flex flex-col items-center justify-center gap-1 py-3 w-full rounded-xl text-[10px] font-medium transition-all ${
//                   activeTab === "signin"
//                     ? "bg-white dark:bg-gray-800 text-violet-600 dark:text-violet-400 shadow-sm border border-gray-100 dark:border-gray-700"
//                     : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 }`}
//               >
//                 <LogIn size={18} />
//                 <span>Sign In</span>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => { setActiveTab("signup"); setError(null); }}
//                 className={`flex flex-col items-center justify-center gap-1 py-3 w-full rounded-xl text-[10px] font-medium transition-all ${
//                   activeTab === "signup"
//                     ? "bg-white dark:bg-gray-800 text-violet-600 dark:text-violet-400 shadow-sm border border-gray-100 dark:border-gray-700"
//                     : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 }`}
//               >
//                 <UserPlus size={18} />
//                 <span>Sign Up</span>
//               </button>
//             </nav>
//           </div>

//           <span className="text-[10px] text-gray-300 dark:text-gray-600 font-semibold tracking-wider uppercase transform -rotate-90 sm:rotate-0">
//             V1.0
//           </span>
//         </div>

//         {/* ── Dynamic Form Panel ── */}
//         <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
//           <div className="space-y-1 mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
//               {activeTab === "signin" ? "Welcome back" : "Get started"}
//             </h2>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">
//               {activeTab === "signin" 
//                 ? "Sign in to your Toolverse workspace." 
//                 : "Create your account to start building."}
//             </p>
//           </div>

//           {/* Error Display */}
//           {error && (
//             <div className="mb-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Full Name (Only shows up during Sign Up) */}
//             {activeTab === "signup" && (
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
//                 <div className={inputWrap("name")}>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     onFocus={() => setFocusedField("name")}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Alex Carter"
//                     required={activeTab === "signup"}
//                     className="w-full px-4 py-2.5 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-xl outline-none"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Email */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
//               <div className={inputWrap("email")}>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onFocus={() => setFocusedField("email")}
//                   onBlur={() => setFocusedField(null)}
//                   placeholder="you@example.com"
//                   required
//                   className="w-full px-4 py-2.5 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-xl outline-none"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="space-y-1.5">
//               <div className="flex items-center justify-between">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 {activeTab === "signin" && (
//                   <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">
//                     Forgot password?
//                   </Link>
//                 )}
//               </div>
//               <div className={inputWrap("password")}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => setFocusedField("password")}
//                   onBlur={() => setFocusedField(null)}
//                   placeholder="••••••••"
//                   required
//                   className="w-full px-4 py-2.5 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm rounded-xl outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="relative w-full py-3 mt-2 rounded-xl font-medium text-sm transition-colors bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isLoading ? (
//                 <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//               ) : (
//                 <>
//                   {activeTab === "signin" ? "Sign in" : "Create account"}
//                   <ArrowRight size={16} />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Micro Footer */}
//           <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-6">
//             By continuing, you agree to our{" "}
//             <Link href="/terms" className="underline hover:text-gray-600 dark:hover:text-gray-300">Terms</Link>
//             {" "}&amp;{" "}
//             <Link href="/privacy" className="underline hover:text-gray-600 dark:hover:text-gray-300">Privacy</Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }
  
  


