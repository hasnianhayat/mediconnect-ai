import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import Logo from '../../components/common/Logo';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-ink-950 to-ink-900 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-pop">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo />
          <span className="mt-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-600"><ShieldCheck size={24} /></span>
          <h1 className="mt-3 font-display text-xl font-bold text-ink-900">Admin Login</h1>
          <p className="mt-1 text-sm text-ink-900/55">Manage the Mediconnect AI platform.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/admin/dashboard'); }} className="space-y-5">
          <Input label="Email" icon={Mail} required placeholder="Enter admin email" />
          <Input label="Password" icon={Lock} type="password" required placeholder="Enter password" />
          <Button type="submit" icon={ArrowRight} iconPosition="right" className="w-full">Login to Admin Panel</Button>
        </form>
        <Link to="/" className="mt-6 block text-center text-sm font-semibold text-ink-900/50 hover:text-brand-600">← Back to site</Link>
      </div>
    </div>
  );
}
