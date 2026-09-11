import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('mediconnect-session', JSON.stringify({ role: 'patient' }));
    navigate('/patient/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <Input label="Full Name" icon={UserRound} type="text" required placeholder="Enter your full name" />

      <Input label="Email" icon={Mail} type="email" required placeholder="Enter your email" />
      <div>
        <label className="field-label">Password <span className="text-coral-500">*</span></label>
        <div className="field-password-shell">
          <div className="field-icon-wrap">
            <LockKeyhole size={16} className="field-icon" />
          </div>
          <input type={showPass ? 'text' : 'password'} required placeholder="Enter your password" className="field-input" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="field-password-toggle" aria-label={showPass ? 'Hide password' : 'Show password'}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm font-semibold text-brand-600 hover:underline">Forgot Password?</Link>
      </div>
      <Button type="submit" icon={ArrowRight} iconPosition="right" className="w-full">Login</Button>
      <p className="text-center text-sm text-ink-900/55">
        Don't have an account? <Link to="/signup" className="font-semibold text-brand-600 hover:underline">Sign up here</Link>
      </p>
    </form>
  );
}
