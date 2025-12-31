import { useState } from 'react';
import { Mail, Lock, User, Loader2, Check } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { signUpSchema, validate } from '../../lib/validation';

export default function SignUpForm({ onSwitchToLogin }) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Validate using zod schema
    const validation = validate(signUpSchema, {
      email,
      password,
      confirmPassword,
      displayName: displayName || undefined,
    });

    if (!validation.success) {
      setErrors(validation.errors || [validation.error]);
      return;
    }

    setLoading(true);

    try {
      const { data } = await signUp(email, password, displayName || email.split('@')[0]);
      // If email confirmation is required, show success message
      if (data?.user && !data.session) {
        setSuccess(true);
      }
      // Otherwise the auth state change will handle the redirect
    } catch (err) {
      setErrors([err.message]);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-[rgba(139,69,19,0.1)] text-center">
          <div className="w-16 h-16 bg-[#9CAF88] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#5C4033] mb-2">
            Check Your Email
          </h2>
          <p className="text-[#6B5344] mb-6">
            We sent a confirmation link to <strong>{email}</strong>.
            Click the link to activate your account.
          </p>
          <button
            onClick={onSwitchToLogin}
            className="text-[#8B4513] font-semibold hover:underline"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-[rgba(139,69,19,0.1)]">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <img
            src="/BlanketWise-Logo.svg"
            alt="BlanketWise"
            className="h-24 w-24 mx-auto mb-4 rounded-full"
          />
          <h1 className="font-display text-3xl font-bold text-[#5C4033]">
            Create Account
          </h1>
          <p className="text-[#6B5344] mt-2">
            Start managing your horse's blanketing needs
          </p>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div role="alert" aria-live="polite" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {errors.length === 1 ? (
              errors[0]
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5C4033] mb-1">
              Display Name <span className="text-[#6B5344] font-normal">(optional)</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/50" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(139,69,19,0.2)] focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 focus:outline-none transition-colors bg-[#FDF8F0]/50"
                placeholder="Your name"
              />
            </div>
          </div>

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
                placeholder="Create a strong password"
              />
            </div>
            <p className="mt-1 text-xs text-[#6B5344]">
              At least 12 characters with a letter and a number
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5C4033] mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]/50" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(139,69,19,0.2)] focus:border-[#D4A84B] focus:ring-2 focus:ring-[#D4A84B]/20 focus:outline-none transition-colors bg-[#FDF8F0]/50"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#5C4033] to-[#8B4513] text-white font-semibold rounded-xl hover:from-[#4a3329] hover:to-[#734011] transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center mt-6 text-[#6B5344]">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-[#8B4513] font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
