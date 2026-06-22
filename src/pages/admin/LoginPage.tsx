import { useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { adminLogin } from "@/lib/supabase/admin"
import { 
  Mail, Lock, Shield, AlertCircle, Loader2, Eye, EyeOff, ArrowRight, 
  Sparkles, ChevronLeft, ChevronRight 
} from "lucide-react"

const propertyImages = [
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    alt: "Modern luxury villa exterior",
    caption: "Luxury Living Redefined"
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    alt: "Contemporary interior design",
    caption: "Elegant Interior Spaces"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    alt: "Premium kitchen design",
    caption: "Gourmet Kitchens"
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    alt: "Scenic poolside view",
    caption: "Resort-Style Living"
  },
  {
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    alt: "Panoramic city view",
    caption: "Breathtaking Views"
  },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextImage = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentImage((prev) => (prev + 1) % propertyImages.length)
      setTimeout(() => setIsTransitioning(false), 700)
    }
  }, [isTransitioning])

  const prevImage = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)
      setTimeout(() => setIsTransitioning(false), 700)
    }
  }, [isTransitioning])

  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [nextImage])

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
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Real Estate Showcase (50%) */}
      <div className="hidden lg:flex lg:w-1/2 relative h-screen overflow-hidden">
        {/* Image Slideshow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={propertyImages[currentImage].url}
              alt={propertyImages[currentImage].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full p-8 xl:p-12">
          {/* Top Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-50" />
              <div className="relative w-11 h-11 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20 overflow-hidden">
                <img 
                  src="/favicon.png" 
                  alt="Vivar Logo" 
                  className="w-7 h-7 object-contain"
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg xl:text-xl font-bold text-white tracking-tight leading-tight">VIVAR</h2>
              <p className="text-[10px] xl:text-xs text-blue-200/80 tracking-wider">REALTY PLATFORM</p>
            </div>
          </motion.div>

          {/* Middle - Caption */}
          <motion.div
            key={`caption-${currentImage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3 px-2"
          >
            <motion.h1 
              className="text-3xl xl:text-4xl font-bold text-white leading-tight"
            >
              {propertyImages[currentImage].caption}
            </motion.h1>
            <p className="text-sm xl:text-base text-gray-300 max-w-sm">
              Discover exceptional properties curated for the most discerning clients.
            </p>
          </motion.div>

          {/* Bottom - Navigation & Stats */}
          <div className="space-y-6">
            {/* Navigation Arrows & Dots */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Progress Dots */}
              <div className="flex gap-1.5">
                {propertyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className="group"
                  >
                    <motion.div
                      animate={{
                        width: index === currentImage ? 24 : 8,
                        backgroundColor: index === currentImage ? "#fff" : "rgba(255,255,255,0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-1.5 rounded-full group-hover:bg-white/60"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xl xl:text-2xl font-bold text-white">500+</p>
                <p className="text-[10px] xl:text-xs text-gray-400">Properties</p>
              </div>
              <div className="text-center">
                <p className="text-xl xl:text-2xl font-bold text-white">50+</p>
                <p className="text-[10px] xl:text-xs text-gray-400">Cities</p>
              </div>
              <div className="text-center">
                <p className="text-xl xl:text-2xl font-bold text-white">98%</p>
                <p className="text-[10px] xl:text-xs text-gray-400">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (50%) */}
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center bg-[#0A0F1E] relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Background Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut"}}
          className="relative w-full max-w-[400px] xl:max-w-[440px] px-4 z-10"
        >
          {/* Mobile Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="lg:hidden flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-slate-700/50 overflow-hidden">
                <img 
                  src="/favicon.png" 
                  alt="Vivar Logo" 
                  className="w-9 h-9 object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Card */}
          <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-slate-800/60 shadow-[0_0_60px_-15px] shadow-blue-500/20 p-6 xl:p-8">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
            
            <div className="relative">
              {/* Header */}
              <div className="text-center mb-6">
                {/* Desktop Logo */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="hidden lg:flex justify-center mb-5"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-slate-700/50 overflow-hidden">
                      <img 
                        src="/favicon.png" 
                        alt="Vivar Logo" 
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3"
                >
                  <Sparkles className="w-3 h-3" />
                  Admin Portal
                </motion.div>
                <h1 className="text-xl xl:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="mt-1 text-slate-400 text-xs xl:text-sm">
                  Sign in to manage your platform
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-400">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-[11px] xl:text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 ${
                      focusedField === 'email' ? 'opacity-100' : 'group-hover:opacity-50'
                    }`} />
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-colors group-hover:text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="admin@vivar.com"
                        required
                        disabled={loading}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="text-[11px] xl:text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 ${
                      focusedField === 'password' ? 'opacity-100' : 'group-hover:opacity-50'
                    }`} />
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-colors group-hover:text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                        className="w-full pl-9 pr-12 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200 text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-slate-700/50 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-[11px] xl:text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-[11px] xl:text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="relative w-full group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300" />
                  <div className="relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm transition-all duration-200 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Sign In to Dashboard
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] xl:text-xs text-slate-500">
                    Secured admin area • Vivar Realty Platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}