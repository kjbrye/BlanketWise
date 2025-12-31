import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { loginSchema, validate } from '../../lib/validation';

export default function LoginForm({ onSwitchToSignUp }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate email format
    const validation = validate(loginSchema, { email, password });
    if (!validation.success) {
      setError(validation.error);
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border border-[rgba(139,69,19,0.1)]">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <img
            src="/BlanketWise-Logo.svg"
            alt="BlanketWise"
            className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-4 rounded-full"
          />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#5C4033]">
            Welcome Back
          </h1>
          <p className="text-[#6B5344] mt-2 text-sm sm:text-base">
            Sign in to manage your horses and blankets
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div role="alert" aria-live="polite" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5C4033] mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(139,69,19,0.2)] focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 focus:outline-none transition-colors bg-[#FDF8F0]/50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C4033] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(139,69,19,0.2)] focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 focus:outline-none transition-colors bg-[#FDF8F0]/50"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 min-h-[44px] bg-gradient-to-r from-[#5C4033] to-[#8B4513] text-white font-semibold rounded-xl hover:from-[#4a3329] hover:to-[#734011] transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Switch to Sign Up */}
        <p className="text-center mt-6 text-[#6B5344]">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignUp}
            className="text-[#8B4513] font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
