import React, { useState } from "react";
import { AxiosError } from "axios";
import LOGO_MAIN from "../../assets/logo_main.png";
import { api } from "@/lib/api/axios";
import { Eye, EyeClosed } from "lucide-react";
const useAuthStore = { getState: () => ({ setAuth: (token: string) => {} }) };

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hide, setHide] = useState(true);

  const setAuth = useAuthStore.getState().setAuth;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const accessToken = response.data?.data.accessToken;
      if (accessToken) setAuth(accessToken);
      window.location.href = "/admin";
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Invalid credentials");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Sleeker, thinner icons (strokeWidth="1.5")
  const LogoSvg = () => (
    <svg
      viewBox="0 0 100 100"
      className="w-14 h-14 text-emerald-900 drop-shadow-sm"
      fill="currentColor"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M50 20 L50 80 M20 50 L80 50 M30 30 L70 70 M30 70 L70 30"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const LockIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );

  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4 py-12 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>

      <div className="w-full max-w-[420px] p-8 sm:p-10 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 relative z-10 transition-all">
        <div className="text-center flex flex-col items-center gap-3 mb-8">
          <img src={LOGO_MAIN} alt="Logo" className="size-28" />
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mt-2">
            Welcome Back
          </h2>
        </div>

        {error && (
          <div
            className="p-3 mb-6 text-sm text-red-700 bg-red-50/80 backdrop-blur-sm rounded-lg border border-red-100"
            role="alert"
          >
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative group">
            <EmailIcon />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-sm font-medium text-gray-900 bg-white/60 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 placeholder:text-gray-400"
              placeholder="Email address"
            />
          </div>

          <div className="relative group">
            <LockIcon />
            <input
              id="password"
              name="password"
              type={hide ? "password" : "text"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-sm font-medium text-gray-900 bg-white/60 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 placeholder:text-gray-400"
              placeholder="Password"
            />
            <div
              onClick={() => setHide(!hide)}
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-gray-500"
            >
              {!hide ? (
                <EyeClosed size={18} strokeWidth={1.5} />
              ) : (
                <Eye size={18} strokeWidth={1.5} />
              )}
            </div>
          </div>

          {/* Clean, separated primary actions */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-emerald-900 text-white text-sm font-medium rounded-xl shadow-md hover:bg-emerald-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-900 transition-all duration-200 disabled:opacity-70"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300/50"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                or
              </span>
              <div className="flex-grow border-t border-gray-300/50"></div>
            </div>

            <button
              type="button"
              className="w-full flex justify-center items-center gap-3 py-3.5 px-4 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-xl border border-gray-200 shadow-sm hover:bg-white hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 transition-all duration-200"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
