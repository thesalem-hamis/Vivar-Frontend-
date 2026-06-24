import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { adminLogin } from "@/lib/supabase/admin"
import { Mail, Lock, AlertCircle, Loader2, Eye, EyeOff, ArrowUpRight } from "lucide-react"

// Import logos from assets (tweak paths as needed)
import logoWhite from "@/assets/logo_white.png" 
import logoMobile from "@/assets/logo_main.png" // Secondary logo image path for mobile layout

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await adminLogin(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      const error = err as Error
      setError(error.message || "Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden font-sans antialiased">
      
      {/* ── LEFT PANEL: PREMIUM PURE WHITE SIGN IN FORM (50%) ── */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 sm:p-12 relative bg-white">
        
        {/* Form container border removed entirely to blend seamlessly */}
        <div className="w-full max-w-[380px] bg-white p-4 sm:p-8">
          
          {/* Mobile Only Header Logo Display (Hidden on Desktop) */}
          <div className="block lg:hidden mb-6 text-left">
            <img src={logoMobile} alt="Vivar Logo Mobile" className="w-20 h-20 object-contain" />
          </div>

          {/* Header - Aligned Left */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-serif font-normal text-[#0E292F] tracking-tight">
              Sign In to Dashboard
            </h2>
            <p className="mt-1.5 text-slate-400 text-xs font-light">
              Enter your official administrator credentials below.
            </p>
          </div>

          {/* Form Action Gateway */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-start gap-2.5 px-3.5 py-3 rounded-none bg-red-50 border border-red-100"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5 stroke-[1.5]" />
                  <p className="text-xs text-red-600/90 leading-normal font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.5]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vivar.com"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 rounded-none bg-slate-50/30 border border-[#0E292F]/40 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0E292F] focus:bg-white transition-all duration-200 text-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] text-[#1D3F47] hover:text-[#0E292F] font-medium transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.5]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-2.5 rounded-none bg-slate-50/30 border border-[#0E292F]/40 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0E292F] focus:bg-white transition-all duration-200 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Keep Logged In Option */}
            <label className="flex items-center gap-2 cursor-pointer group select-none py-0.5">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded-none border-[#0E292F]/40 bg-slate-50 text-[#0E292F] focus:ring-[#0E292F]/20 cursor-pointer transition-colors"
              />
              <span className="text-[11px] text-slate-500 group-hover:text-slate-700 transition-colors">
                Stay logged in on this machine
              </span>
            </label>

            {/* Premium Button Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center w-full justify-between pl-6 pr-1.5 py-1.5 rounded-[8px] bg-[#0E292F] text-white hover:bg-white hover:text-[#0E292F] border border-[#0E292F] transition-all duration-300 group font-sans text-[10px] sm:text-[11px] font-bold tracking-widest uppercase whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="w-full text-center pr-2">
                  {loading ? "Verifying Access..." : "Login to Dashboard"}
                </span>
                
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] bg-white text-[#0E292F] group-hover:bg-[#0E292F] group-hover:text-white transition-all duration-300 shrink-0">
                  {loading ? (
                    <Loader2 className="w-[14px] h-[14px] animate-spin" />
                  ) : (
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  )}
                </div>
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* ── RIGHT PANEL: CLASSIC BRAND SHOWCASE (50%) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0E292F] relative h-full flex-col justify-between p-16 text-white overflow-hidden">
        {/* Deep background decoration */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1D21] via-[#0E292F] to-[#1D3F47] opacity-90" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#1D3F47]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding (Desktop Variant) */}
        <div className="relative z-10 flex items-center">
          <img src={logoWhite} alt="Vivar Logo Desktop" className="w-25 h-25 object-contain" />
        </div>

        {/* Center Spotlight Copy */}
        <div className="relative z-10 max-w-md my-auto space-y-4">
          <h1 className="text-4xl font-serif font-normal text-[#F5F5F7] leading-tight tracking-tight">
            Elevating property management to an art form.
          </h1>
          <p className="text-white/60 text-sm font-light leading-relaxed">
            Welcome back to the secure control hub. Access your localized portfolio tracking, high-tier analytics, and secure institutional transaction logs.
          </p>
        </div>

        {/* Bottom Footer Signal */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-white/30 font-light tracking-wide">
          <span>© Vivar Realty Limited</span>
          <span>•</span>
          <span>Secured Admin Node</span>
        </div>
      </div>

    </div>
  )
}