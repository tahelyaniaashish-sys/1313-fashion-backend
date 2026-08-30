import React, { useState } from 'react';
import { X, Lock, LogOut, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../context/ThemeContext';

interface AdminLoginGateProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Wraps the admin orders panel. Only renders `children` (the real
 * AdminOrdersModal) once a Firebase-authenticated admin session exists.
 * Anyone who is not logged in sees a password prompt instead of order data.
 */
export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ isOpen, onClose, children }) => {
  const { user, loading, login, logout } = useAdminAuth();
  const { isLight } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  // Already logged in as admin -> show the real orders/settings panel.
  if (user) {
    return (
      <>
        {children}
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md ${
      isLight ? 'bg-stone-900/60' : 'bg-neutral-950/90'
    }`}>
      <div className={`relative w-full max-w-sm border rounded-3xl p-6 sm:p-8 shadow-2xl ${
        isLight
          ? 'bg-white border-stone-300 text-stone-900'
          : 'bg-neutral-900 border-amber-500/40 text-neutral-100'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full border cursor-pointer ${
            isLight
              ? 'bg-stone-100 text-stone-500 hover:text-stone-900 border-stone-300'
              : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            isLight ? 'bg-amber-100' : 'bg-amber-500/20'
          }`}>
            <Lock className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-amber-300'}`} />
          </div>
          <h3 className="font-serif text-lg font-bold">Admin Login</h3>
          <p className={`text-xs font-mono mt-1 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
            Store orders & payment settings are private.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            autoFocus
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
              isLight
                ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600'
                : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
            }`}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
              isLight
                ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600'
                : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
            }`}
          />

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-500 font-mono">
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full px-4 py-3 rounded-xl font-mono text-xs uppercase font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg disabled:opacity-60 cursor-pointer"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const AdminLogoutButton: React.FC = () => {
  const { logout } = useAdminAuth();
  return (
    <button
      onClick={() => logout()}
      title="Log out of admin"
      className="flex items-center gap-1.5 text-xs font-mono opacity-70 hover:opacity-100 cursor-pointer"
    >
      <LogOut className="w-3.5 h-3.5" />
      Log out
    </button>
  );
};
