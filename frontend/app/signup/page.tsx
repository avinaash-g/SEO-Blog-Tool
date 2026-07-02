"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Zap, Check } from "lucide-react";

const orbStyles = `
  .auth-orb {
    position: absolute;
    border-radius: 9999px;
    filter: blur(80px);
    animation: authFloat 8s ease-in-out infinite;
  }
  .auth-orb-1 { width: 350px; height: 350px; top: -80px; left: -60px; animation-delay: 0s; }
  .auth-orb-2 { width: 280px; height: 280px; bottom: -60px; right: -50px; animation-delay: -4s; }
  .auth-orb-3 { width: 180px; height: 180px; top: 50%; left: 40%; animation-delay: -2s; }
  @keyframes authFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    33%       { transform: translateY(-18px) scale(1.03); }
    66%       { transform: translateY(12px) scale(0.97); }
  }
`;

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];
  const barColor = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-400"][score];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColor : "bg-gray-200 dark:bg-gray-700"}`}
          />
        ))}
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 w-12 text-right">{strengthLabel}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 ${c.pass ? "bg-violet-600 dark:bg-[#A6FF5B]" : "border border-gray-300 dark:border-gray-600"}`}>
              {c.pass && <Check size={9} className="text-white dark:text-black" strokeWidth={3} />}
            </div>
            <span className={`text-xs transition-colors duration-200 ${c.pass ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || passwordsMismatch) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Matches backend parameters perfectly
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Account creation failed.");
      }

      setSuccess("Account created successfully! Redirecting to login…");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected network error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputWrap = (field: string) =>
    `relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-900 ${
      focusedField === field
        ? "border-violet-500 dark:border-[#A6FF5B] shadow-[0_0_0_3px_rgba(139,92,246,0.15)] dark:shadow-[0_0_0_3px_rgba(166,255,91,0.12)]"
        : "border-gray-200 dark:border-gray-700"
    }`;

  const confirmWrap = `relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-900 ${
    passwordsMismatch
      ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
      : passwordsMatch
        ? "border-emerald-400"
        : focusedField === "confirm"
          ? "border-violet-500 dark:border-[#A6FF5B] shadow-[0_0_0_3px_rgba(139,92,246,0.15)] dark:shadow-[0_0_0_3px_rgba(166,255,91,0.12)]"
          : "border-gray-200 dark:border-gray-700"
  }`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: orbStyles }} />

      <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        {/* ── Left Brand Panel ── */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-violet-600 dark:bg-[#0d0d0d] flex-col items-center justify-center p-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="auth-orb auth-orb-1 bg-violet-300/30 dark:bg-[#A6FF5B]/15" />
            <div className="auth-orb auth-orb-2 bg-violet-900/30 dark:bg-[#A6FF5B]/10" />
            <div className="auth-orb auth-orb-3 bg-white/10 dark:bg-[#A6FF5B]/10" />
            <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="signup-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#signup-grid)" />
            </svg>
          </div>

          <div className="relative z-10 text-white dark:text-[#A6FF5B] max-w-sm text-center space-y-8">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-[#A6FF5B]/20 flex items-center justify-center backdrop-blur-sm">
                <Zap size={20} className="text-white dark:text-[#A6FF5B] fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">Toolverse</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                Start your<br />journey.
              </h1>
              <p className="text-white/70 dark:text-[#A6FF5B]/60 text-base leading-relaxed">
                Join thousands of people who get things done faster. Setup takes under a minute.
              </p>
            </div>

            <div className="space-y-3 text-left">
              {["Free forever on the starter plan", "No credit card required", "Cancel or upgrade anytime"].map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-[#A6FF5B]/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-white dark:text-[#A6FF5B]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-white/80 dark:text-[#A6FF5B]/70">{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 bg-white/10 dark:bg-[#A6FF5B]/10 rounded-2xl px-4 py-3 border border-white/20 dark:border-[#A6FF5B]/20">
              <div className="flex -space-x-2">
                {["PK", "SM", "RT"].map((initials) => (
                  <div key={initials} className="w-7 h-7 rounded-full bg-violet-400 dark:bg-[#A6FF5B]/30 flex items-center justify-center text-[10px] font-bold text-white dark:text-[#A6FF5B] border-2 border-violet-600 dark:border-[#0d0d0d]">
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/80 dark:text-[#A6FF5B]/70">
                <span className="font-semibold text-white dark:text-[#A6FF5B]">2,400+</span> people joined this month
              </p>
            </div>
          </div>
        </div>

        {/* ── Right Form Panel ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-6">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-9 h-9 rounded-xl bg-violet-600 dark:bg-[#A6FF5B] flex items-center justify-center">
                <Zap size={18} className="text-white dark:text-black fill-current" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Toolverse</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Create account</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-violet-600 dark:text-[#A6FF5B] font-semibold hover:underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Response notifications */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl text-sm font-medium">
                {success}
              </div>
            )}

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              {["Google", "GitHub"].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-violet-400 dark:hover:border-[#A6FF5B]/60 hover:bg-violet-50 dark:hover:bg-[#A6FF5B]/5 transition-all duration-200"
                >
                  {provider === "Google" ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 fill-current text-gray-800 dark:text-white" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  )}
                  {provider}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
                <div className={inputWrap("name")}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Priya Sharma"
                    required
                    className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div className={inputWrap("email")}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className={inputWrap("password")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Create a strong password"
                    required
                    className="w-full px-4 py-3 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>
                <div className={confirmWrap}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onFocus={() => setFocusedField("confirm")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Repeat your password"
                    required
                    className="w-full px-4 py-3 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordsMismatch && <p className="text-xs text-red-500 mt-1">Passwords don&apos;t match</p>}
                {passwordsMatch && (
                  <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                    <Check size={11} strokeWidth={3} /> Passwords match
                  </p>
                )}
              </div>

              {/* Terms */}
              <div
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => setAgreed(!agreed)}
              >
                <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${agreed ? "bg-violet-600 dark:bg-[#A6FF5D] border-violet-600 dark:border-[#A6FF5B]" : "border-gray-300 dark:border-gray-600 group-hover:border-violet-400 dark:group-hover:border-[#A6FF5B]/60"}`}>
                  {agreed && <Check size={10} className="text-white dark:text-black" strokeWidth={3} />}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed select-none">
                  I agree to the{" "}
                  <Link href="/terms" onClick={(e) => e.stopPropagation()} className="text-violet-600 dark:text-[#A6FF5B] hover:underline underline-offset-2">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" onClick={(e) => e.stopPropagation()} className="text-violet-600 dark:text-[#A6FF5B] hover:underline underline-offset-2">Privacy Policy</Link>
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !agreed || passwordsMismatch}
                className="relative w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5B] dark:hover:bg-[#8fe63e] text-white dark:text-black shadow-lg shadow-violet-200 dark:shadow-[#A6FF5B]/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
              >
                <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>
                  Create account
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff, ArrowRight, Zap, Check } from "lucide-react";

// const orbStyles = `
//   .auth-orb {
//     position: absolute;
//     border-radius: 9999px;
//     filter: blur(80px);
//     animation: authFloat 8s ease-in-out infinite;
//   }
//   .auth-orb-1 { width: 350px; height: 350px; top: -80px; left: -60px; animation-delay: 0s; }
//   .auth-orb-2 { width: 280px; height: 280px; bottom: -60px; right: -50px; animation-delay: -4s; }
//   .auth-orb-3 { width: 180px; height: 180px; top: 50%; left: 40%; animation-delay: -2s; }
//   @keyframes authFloat {
//     0%, 100% { transform: translateY(0px) scale(1); }
//     33%       { transform: translateY(-18px) scale(1.03); }
//     66%       { transform: translateY(12px) scale(0.97); }
//   }
// `;

// function PasswordStrength({ password }: { password: string }) {
//   const checks = [
//     { label: "8+ characters", pass: password.length >= 8 },
//     { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
//     { label: "Number", pass: /[0-9]/.test(password) },
//     { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
//   ];
//   const score = checks.filter((c) => c.pass).length;
//   const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];
//   const barColor = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-400"][score];

//   if (!password) return null;

//   return (
//     <div className="space-y-2 mt-2">
//       <div className="flex items-center gap-1.5">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColor : "bg-gray-200 dark:bg-gray-700"}`}
//           />
//         ))}
//         <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 w-12 text-right">{strengthLabel}</span>
//       </div>
//       <div className="grid grid-cols-2 gap-x-4 gap-y-1">
//         {checks.map((c) => (
//           <div key={c.label} className="flex items-center gap-1.5">
//             <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 ${c.pass ? "bg-violet-600 dark:bg-[#A6FF5B]" : "border border-gray-300 dark:border-gray-600"}`}>
//               {c.pass && <Check size={9} className="text-white dark:text-black" strokeWidth={3} />}
//             </div>
//             <span className={`text-xs transition-colors duration-200 ${c.pass ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}>
//               {c.label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function SignupPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [agreed, setAgreed] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const passwordsMatch = confirm.length > 0 && password === confirm;
//   const passwordsMismatch = confirm.length > 0 && password !== confirm;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!agreed || passwordsMismatch) return;
//     setIsLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Account creation failed.");
//       }

//       setSuccess("Account created successfully! Redirecting to login...");
//       setTimeout(() => {
//         router.push("/login");
//       }, 2000);
//     } catch (err: unknown) {
//   if (err instanceof Error) {
//     setError(err.message);
//   } else {
//     setError("An unexpected network error occurred.");
//   }
// } finally {
//   setIsLoading(false);
// }
//   };

//   const inputWrap = (field: string) =>
//     `relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-900 ${
//       focusedField === field
//         ? "border-violet-500 dark:border-[#A6FF5B] shadow-[0_0_0_3px_rgba(139,92,246,0.15)] dark:shadow-[0_0_0_3px_rgba(166,255,91,0.12)]"
//         : "border-gray-200 dark:border-gray-700"
//     }`;

//   const confirmWrap = `relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-900 ${
//     passwordsMismatch
//       ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
//       : passwordsMatch
//         ? "border-emerald-400"
//         : focusedField === "confirm"
//           ? "border-violet-500 dark:border-[#A6FF5B] shadow-[0_0_0_3px_rgba(139,92,246,0.15)] dark:shadow-[0_0_0_3px_rgba(166,255,91,0.12)]"
//           : "border-gray-200 dark:border-gray-700"
//   }`;

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: orbStyles }} />

//       <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
//         {/* ── Left Brand Panel ── */}
//         <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-violet-600 dark:bg-[#0d0d0d] flex-col items-center justify-center p-12">
//           <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             <div className="auth-orb auth-orb-1 bg-violet-300/30 dark:bg-[#A6FF5B]/15" />
//             <div className="auth-orb auth-orb-2 bg-violet-900/30 dark:bg-[#A6FF5B]/10" />
//             <div className="auth-orb auth-orb-3 bg-white/10 dark:bg-[#A6FF5B]/10" />
//             <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <pattern id="signup-grid" width="48" height="48" patternUnits="userSpaceOnUse">
//                   <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#signup-grid)" />
//             </svg>
//           </div>

//           <div className="relative z-10 text-white dark:text-[#A6FF5B] max-w-sm text-center space-y-8">
//             <div className="flex items-center justify-center gap-2">
//               <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-[#A6FF5B]/20 flex items-center justify-center backdrop-blur-sm">
//                 <Zap size={20} className="text-white dark:text-[#A6FF5B] fill-current" />
//               </div>
//               <span className="text-xl font-bold tracking-tight">Toolverse</span>
//             </div>

//             <div className="space-y-3">
//               <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
//                 Start your<br />journey.
//               </h1>
//               <p className="text-white/70 dark:text-[#A6FF5B]/60 text-base leading-relaxed">
//                 Join thousands of people who get things done faster. Setup takes under a minute.
//               </p>
//             </div>

//             <div className="space-y-3 text-left">
//               {["Free forever on the starter plan", "No credit card required", "Cancel or upgrade anytime"].map((feat) => (
//                 <div key={feat} className="flex items-center gap-3">
//                   <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-[#A6FF5B]/20 flex items-center justify-center flex-shrink-0">
//                     <Check size={12} className="text-white dark:text-[#A6FF5B]" strokeWidth={3} />
//                   </div>
//                   <span className="text-sm text-white/80 dark:text-[#A6FF5B]/70">{feat}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center gap-3 bg-white/10 dark:bg-[#A6FF5B]/10 rounded-2xl px-4 py-3 border border-white/20 dark:border-[#A6FF5B]/20">
//               <div className="flex -space-x-2">
//                 {["PK", "SM", "RT"].map((initials) => (
//                   <div key={initials} className="w-7 h-7 rounded-full bg-violet-400 dark:bg-[#A6FF5B]/30 flex items-center justify-center text-[10px] font-bold text-white dark:text-[#A6FF5B] border-2 border-violet-600 dark:border-[#0d0d0d]">
//                     {initials}
//                   </div>
//                 ))}
//               </div>
//               <p className="text-xs text-white/80 dark:text-[#A6FF5B]/70">
//                 <span className="font-semibold text-white dark:text-[#A6FF5B]">2,400+</span> people joined this month
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ── Right Form Panel ── */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
//           <div className="w-full max-w-md space-y-6">
//             {/* Mobile logo */}
//             <div className="flex items-center gap-2 lg:hidden">
//               <div className="w-9 h-9 rounded-xl bg-violet-600 dark:bg-[#A6FF5B] flex items-center justify-center">
//                 <Zap size={18} className="text-white dark:text-black fill-current" />
//               </div>
//               <span className="text-lg font-bold text-gray-900 dark:text-white">Toolverse</span>
//             </div>

//             <div className="space-y-1">
//               <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Create account</h2>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 Already have an account?{" "}
//                 <Link href="/login" className="text-violet-600 dark:text-[#A6FF5B] font-semibold hover:underline underline-offset-2">
//                   Sign in
//                 </Link>
//               </p>
//             </div>

//             {/* Response notifications */}
//             {error && (
//               <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-sm font-medium">
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl text-sm font-medium">
//                 {success}
//               </div>
//             )}

//             {/* Social buttons */}
//             <div className="grid grid-cols-2 gap-3">
//               {["Google", "GitHub"].map((provider) => (
//                 <button
//                   key={provider}
//                   type="button"
//                   className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-violet-400 dark:hover:border-[#A6FF5B]/60 hover:bg-violet-50 dark:hover:bg-[#A6FF5B]/5 transition-all duration-200"
//                 >
//                   {provider === "Google" ? (
//                     <svg className="w-4 h-4" viewBox="0 0 24 24">
//                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                     </svg>
//                   ) : (
//                     <svg className="w-4 h-4 fill-current text-gray-800 dark:text-white" viewBox="0 0 24 24">
//                       <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
//                     </svg>
//                   )}
//                   {provider}
//                 </button>
//               ))}
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
//               <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">or continue with email</span>
//               <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name */}
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
//                 <div className={inputWrap("name")}>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     onFocus={() => setFocusedField("name")}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Priya Sharma"
//                     required
//                     className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <div className={inputWrap("email")}>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onFocus={() => setFocusedField("email")}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="you@example.com"
//                     required
//                     className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <div className={inputWrap("password")}>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onFocus={() => setFocusedField("password")}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Create a strong password"
//                     required
//                     className="w-full px-4 py-3 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
//                   >
//                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//                 <PasswordStrength password={password} />
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>
//                 <div className={confirmWrap}>
//                   <input
//                     type={showConfirm ? "text" : "password"}
//                     value={confirm}
//                     onChange={(e) => setConfirm(e.target.value)}
//                     onFocus={() => setFocusedField("confirm")}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Repeat your password"
//                     required
//                     className="w-full px-4 py-3 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirm(!showConfirm)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
//                   >
//                     {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//                 {passwordsMismatch && <p className="text-xs text-red-500 mt-1">Passwords don&apos;t match</p>}
//                 {passwordsMatch && (
//                   <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
//                     <Check size={11} strokeWidth={3} /> Passwords match
//                   </p>
//                 )}
//               </div>

//               {/* Terms */}
//               <div
//                 className="flex items-start gap-3 cursor-pointer group"
//                 onClick={() => setAgreed(!agreed)}
//               >
//                 <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${agreed ? "bg-violet-600 dark:bg-[#A6FF5D] border-violet-600 dark:border-[#A6FF5D]" : "border-gray-300 dark:border-gray-600 group-hover:border-violet-400 dark:group-hover:border-[#A6FF5D]/60"}`}>
//                   {agreed && <Check size={10} className="text-white dark:text-black" strokeWidth={3} />}
//                 </div>
//                 <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed select-none">
//                   I agree to the{" "}
//                   <Link href="/terms" onClick={(e) => e.stopPropagation()} className="text-violet-600 dark:text-[#A6FF5B] hover:underline underline-offset-2">Terms of Service</Link>
//                   {" "}and{" "}
//                   <Link href="/privacy" onClick={(e) => e.stopPropagation()} className="text-violet-600 dark:text-[#A6FF5B] hover:underline underline-offset-2">Privacy Policy</Link>
//                 </span>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={isLoading || !agreed || passwordsMismatch}
//                 className="relative w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5B] dark:hover:bg-[#8fe63e] text-white dark:text-black shadow-lg shadow-violet-200 dark:shadow-[#A6FF5B]/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
//               >
//                 <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>
//                   Create account
//                   <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
//                 </span>
//                 {isLoading && (
//                   <span className="absolute inset-0 flex items-center justify-center">
//                     <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>
//                   </span>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// "use client";



// import { useState } from "react";

// import Link from "next/link";

// import { Eye, EyeOff, ArrowRight, Zap, Check } from "lucide-react";



// const orbStyles = `

//   .auth-orb {

//     position: absolute;

//     border-radius: 9999px;

//     filter: blur(80px);

//     animation: authFloat 8s ease-in-out infinite;

//   }

//   .auth-orb-1 { width: 350px; height: 350px; top: -80px; left: -60px; animation-delay: 0s; }

//   .auth-orb-2 { width: 280px; height: 280px; bottom: -60px; right: -50px; animation-delay: -4s; }

//   .auth-orb-3 { width: 180px; height: 180px; top: 50%; left: 40%; animation-delay: -2s; }

//   @keyframes authFloat {

//     0%, 100% { transform: translateY(0px) scale(1); }

//     33%       { transform: translateY(-18px) scale(1.03); }

//     66%       { transform: translateY(12px) scale(0.97); }

//   }

// `;



// function PasswordStrength({ password }: { password: string }) {

//   const checks = [

//     { label: "8+ characters", pass: password.length >= 8 },

//     { label: "Uppercase letter", pass: /[A-Z]/.test(password) },

//     { label: "Number", pass: /[0-9]/.test(password) },

//     { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },

//   ];

//   const score = checks.filter((c) => c.pass).length;

//   const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];

//   const barColor = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-400"][score];



//   if (!password) return null;



//   return (

//     <div className="space-y-2 mt-2">

//       <div className="flex items-center gap-1.5">

//         {[1, 2, 3, 4].map((i) => (

//           <div

//             key={i}

//             className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColor : "bg-gray-200 dark:bg-gray-700"}`}

//           />

//         ))}

//         <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 w-12 text-right">{strengthLabel}</span>

//       </div>

//       <div className="grid grid-cols-2 gap-x-4 gap-y-1">

//         {checks.map((c) => (

//           <div key={c.label} className="flex items-center gap-1.5">

//             <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 ${c.pass ? "bg-violet-600 dark:bg-[#A6FF5B]" : "border border-gray-300 dark:border-gray-600"}`}>

//               {c.pass && <Check size={9} className="text-white dark:text-black" strokeWidth={3} />}

//             </div>

//             <span className={`text-xs transition-colors duration-200 ${c.pass ? "text-gray-700 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"}`}>

//               {c.label}

//             </span>

//           </div>

//         ))}

//       </div>

//     </div>

//   );

// }



// export default function SignupPage() {

//   const [showPassword, setShowPassword] = useState(false);

//   const [showConfirm, setShowConfirm] = useState(false);

//   const [name, setName] = useState("");

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const [confirm, setConfirm] = useState("");

//   const [isLoading, setIsLoading] = useState(false);

//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   const [agreed, setAgreed] = useState(false);



//   const passwordsMatch = confirm.length > 0 && password === confirm;

//   const passwordsMismatch = confirm.length > 0 && password !== confirm;



//   const handleSubmit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     if (!agreed || passwordsMismatch) return;

//     setIsLoading(true);

//     // Connect your auth logic here

//     await new Promise((r) => setTimeout(r, 1500));

//     setIsLoading(false);

//   };



//   const inputWrap = (field: string) =>

//     `relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-900 ${

//       focusedField === field

//         ? "border-violet-500 dark:border-[#A6FF5B] shadow-[0_0_0_3px_rgba(139,92,246,0.15)] dark:shadow-[0_0_0_3px_rgba(166,255,91,0.12)]"

//         : "border-gray-200 dark:border-gray-700"

//     }`;



//   const confirmWrap = `relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-900 ${

//     passwordsMismatch

//       ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"

//       : passwordsMatch

//         ? "border-emerald-400"

//         : focusedField === "confirm"

//           ? "border-violet-500 dark:border-[#A6FF5B] shadow-[0_0_0_3px_rgba(139,92,246,0.15)] dark:shadow-[0_0_0_3px_rgba(166,255,91,0.12)]"

//           : "border-gray-200 dark:border-gray-700"

//   }`;



//   return (

//     <>

//       <style dangerouslySetInnerHTML={{ __html: orbStyles }} />



//       <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] transition-colors duration-500">

//         {/* ── Left Brand Panel ── */}

//         <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-violet-600 dark:bg-[#0d0d0d] flex-col items-center justify-center p-12">

//           <div className="absolute inset-0 overflow-hidden pointer-events-none">

//             <div className="auth-orb auth-orb-1 bg-violet-300/30 dark:bg-[#A6FF5B]/15" />

//             <div className="auth-orb auth-orb-2 bg-violet-900/30 dark:bg-[#A6FF5B]/10" />

//             <div className="auth-orb auth-orb-3 bg-white/10 dark:bg-[#A6FF5B]/10" />

//             <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">

//               <defs>

//                 <pattern id="signup-grid" width="48" height="48" patternUnits="userSpaceOnUse">

//                   <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />

//                 </pattern>

//               </defs>

//               <rect width="100%" height="100%" fill="url(#signup-grid)" />

//             </svg>

//           </div>



//           <div className="relative z-10 text-white dark:text-[#A6FF5B] max-w-sm text-center space-y-8">

//             <div className="flex items-center justify-center gap-2">

//               <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-[#A6FF5B]/20 flex items-center justify-center backdrop-blur-sm">

//                 <Zap size={20} className="text-white dark:text-[#A6FF5B] fill-current" />

//               </div>

//               <span className="text-xl font-bold tracking-tight">Toolverse</span>

//             </div>



//             <div className="space-y-3">

//               <h1 className="text-4xl font-extrabold leading-tight tracking-tight">

//                 Start your<br />journey.

//               </h1>

//               <p className="text-white/70 dark:text-[#A6FF5B]/60 text-base leading-relaxed">

//                 Join thousands of people who get things done faster. Setup takes under a minute.

//               </p>

//             </div>



//             <div className="space-y-3 text-left">

//               {["Free forever on the starter plan", "No credit card required", "Cancel or upgrade anytime"].map((feat) => (

//                 <div key={feat} className="flex items-center gap-3">

//                   <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-[#A6FF5B]/20 flex items-center justify-center flex-shrink-0">

//                     <Check size={12} className="text-white dark:text-[#A6FF5B]" strokeWidth={3} />

//                   </div>

//                   <span className="text-sm text-white/80 dark:text-[#A6FF5B]/70">{feat}</span>

//                 </div>

//               ))}

//             </div>



//             <div className="flex items-center gap-3 bg-white/10 dark:bg-[#A6FF5B]/10 rounded-2xl px-4 py-3 border border-white/20 dark:border-[#A6FF5B]/20">

//               <div className="flex -space-x-2">

//                 {["PK", "SM", "RT"].map((initials) => (

//                   <div key={initials} className="w-7 h-7 rounded-full bg-violet-400 dark:bg-[#A6FF5B]/30 flex items-center justify-center text-[10px] font-bold text-white dark:text-[#A6FF5B] border-2 border-violet-600 dark:border-[#0d0d0d]">

//                     {initials}

//                   </div>

//                 ))}

//               </div>

//               <p className="text-xs text-white/80 dark:text-[#A6FF5B]/70">

//                 <span className="font-semibold text-white dark:text-[#A6FF5B]">2,400+</span> people joined this month

//               </p>

//             </div>

//           </div>

//         </div>



//         {/* ── Right Form Panel ── */}

//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">

//           <div className="w-full max-w-md space-y-6">

//             {/* Mobile logo */}

//             <div className="flex items-center gap-2 lg:hidden">

//               <div className="w-9 h-9 rounded-xl bg-violet-600 dark:bg-[#A6FF5B] flex items-center justify-center">

//                 <Zap size={18} className="text-white dark:text-black fill-current" />

//               </div>

//               <span className="text-lg font-bold text-gray-900 dark:text-white">YourBrand</span>

//             </div>



//             <div className="space-y-1">

//               <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Create account</h2>

//               <p className="text-gray-500 dark:text-gray-400 text-sm">

//                 Already have an account?{" "}

//                 <Link href="/login" className="text-violet-600 dark:text-[#A6FF5B] font-semibold hover:underline underline-offset-2">

//                   Sign in

//                 </Link>

//               </p>

//             </div>



//             {/* Social buttons */}

//             <div className="grid grid-cols-2 gap-3">

//               {["Google", "GitHub"].map((provider) => (

//                 <button

//                   key={provider}

//                   type="button"

//                   className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-violet-400 dark:hover:border-[#A6FF5B]/60 hover:bg-violet-50 dark:hover:bg-[#A6FF5B]/5 transition-all duration-200"

//                 >

//                   {provider === "Google" ? (

//                     <svg className="w-4 h-4" viewBox="0 0 24 24">

//                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />

//                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />

//                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />

//                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />

//                     </svg>

//                   ) : (

//                     <svg className="w-4 h-4 fill-current text-gray-800 dark:text-white" viewBox="0 0 24 24">

//                       <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />

//                     </svg>

//                   )}

//                   {provider}

//                 </button>

//               ))}

//             </div>



//             <div className="flex items-center gap-3">

//               <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />

//               <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">or continue with email</span>

//               <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />

//             </div>



//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* Name */}

//               <div className="space-y-1.5">

//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>

//                 <div className={inputWrap("name")}>

//                   <input

//                     type="text"

//                     value={name}

//                     onChange={(e) => setName(e.target.value)}

//                     onFocus={() => setFocusedField("name")}

//                     onBlur={() => setFocusedField(null)}

//                     placeholder="Priya Sharma"

//                     required

//                     className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"

//                   />

//                 </div>

//               </div>



//               {/* Email */}

//               <div className="space-y-1.5">

//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>

//                 <div className={inputWrap("email")}>

//                   <input

//                     type="email"

//                     value={email}

//                     onChange={(e) => setEmail(e.target.value)}

//                     onFocus={() => setFocusedField("email")}

//                     onBlur={() => setFocusedField(null)}

//                     placeholder="you@example.com"

//                     required

//                     className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"

//                   />

//                 </div>

//               </div>



//               {/* Password */}

//               <div className="space-y-1.5">

//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>

//                 <div className={inputWrap("password")}>

//                   <input

//                     type={showPassword ? "text" : "password"}

//                     value={password}

//                     onChange={(e) => setPassword(e.target.value)}

//                     onFocus={() => setFocusedField("password")}

//                     onBlur={() => setFocusedField(null)}

//                     placeholder="Create a strong password"

//                     required

//                     className="w-full px-4 py-3 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"

//                   />

//                   <button

//                     type="button"

//                     onClick={() => setShowPassword(!showPassword)}

//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"

//                   >

//                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}

//                   </button>

//                 </div>

//                 <PasswordStrength password={password} />

//               </div>



//               {/* Confirm Password */}

//               <div className="space-y-1.5">

//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>

//                 <div className={confirmWrap}>

//                   <input

//                     type={showConfirm ? "text" : "password"}

//                     value={confirm}

//                     onChange={(e) => setConfirm(e.target.value)}

//                     onFocus={() => setFocusedField("confirm")}

//                     onBlur={() => setFocusedField(null)}

//                     placeholder="Repeat your password"

//                     required

//                     className="w-full px-4 py-3 pr-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm rounded-xl outline-none"

//                   />

//                   <button

//                     type="button"

//                     onClick={() => setShowConfirm(!showConfirm)}

//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"

//                   >

//                     {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}

//                   </button>

//                 </div>

//                 {passwordsMismatch && <p className="text-xs text-red-500 mt-1">Passwords don&apos;t match</p>}

//                 {passwordsMatch && (

//                   <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">

//                     <Check size={11} strokeWidth={3} /> Passwords match

//                   </p>

//                 )}

//               </div>



//               {/* Terms */}

//               <div

//                 className="flex items-start gap-3 cursor-pointer group"

//                 onClick={() => setAgreed(!agreed)}

//               >

//                 <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all duration-200 ${agreed ? "bg-violet-600 dark:bg-[#A6FF5B] border-violet-600 dark:border-[#A6FF5B]" : "border-gray-300 dark:border-gray-600 group-hover:border-violet-400 dark:group-hover:border-[#A6FF5B]/60"}`}>

//                   {agreed && <Check size={10} className="text-white dark:text-black" strokeWidth={3} />}

//                 </div>

//                 <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed select-none">

//                   I agree to the{" "}

//                   <Link href="/terms" onClick={(e) => e.stopPropagation()} className="text-violet-600 dark:text-[#A6FF5B] hover:underline underline-offset-2">Terms of Service</Link>

//                   {" "}and{" "}

//                   <Link href="/privacy" onClick={(e) => e.stopPropagation()} className="text-violet-600 dark:text-[#A6FF5B] hover:underline underline-offset-2">Privacy Policy</Link>

//                 </span>

//               </div>



//               {/* Submit */}

//               <button

//                 type="submit"

//                 disabled={isLoading || !agreed || passwordsMismatch}

//                 className="relative w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5B] dark:hover:bg-[#8fe63e] text-white dark:text-black shadow-lg shadow-violet-200 dark:shadow-[#A6FF5B]/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"

//               >

//                 <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>

//                   Create account

//                   <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />

//                 </span>

//                 {isLoading && (

//                   <span className="absolute inset-0 flex items-center justify-center">

//                     <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">

//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />

//                     </svg>

//                   </span>

//                 )}

//               </button>

//             </form>

//           </div>

//         </div>

//       </div>

//     </>

//   );

// }



