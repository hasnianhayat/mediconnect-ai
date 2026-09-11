import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, LockKeyhole, Mail, PhoneCall, Send } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

export default function ForgotPasswordForm() {
  const [method, setMethod] = useState('email');
  const [sent, setSent] = useState(false);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-semibold text-ink-900">Choose How to Receive Code</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'email', label: 'Send Code through Email', icon: Mail },
            { key: 'phone', label: 'Send Code through Number', icon: PhoneCall },
          ].map((m) => (
            <button
              type="button"
              key={m.key}
              onClick={() => setMethod(m.key)}
              className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-5 text-center text-sm font-semibold transition ${
                method === m.key ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-sand-200 text-ink-900/60 hover:bg-sand-50'
              }`}
            >
              <m.icon size={22} />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <Input label={method === 'email' ? 'Enter Email' : 'Enter Mobile Number'} icon={method === 'email' ? Mail : PhoneCall} required placeholder="Enter your email or mobile number" hint="We will send a verification code to this email or number." />

      <div>
        <label className="field-label">Verification Code</label>
        <div className="flex gap-3">
          <div className="field-icon-wrap flex-1">
            <span className="field-icon"><KeyRound size={16} /></span>
            <input placeholder="Enter 6-digit code" className="field-input-icon" />
          </div>
          <Button type="button" variant="secondary" icon={Send} onClick={() => setSent(true)}>Send Code</Button>
        </div>
        {sent && <p className="mt-1.5 text-xs font-semibold text-mint-500">Code sent! Check your inbox.</p>}
      </div>

      <div>
        <label className="field-label">New Password</label>
        <div className="field-password-shell">
          <div className="field-icon-wrap">
            <LockKeyhole size={16} className="field-icon" />
          </div>
          <input type="password" placeholder="Enter new password" className="field-input" />
        </div>
      </div>
      <div>
        <label className="field-label">Confirm New Password</label>
        <div className="field-password-shell">
          <div className="field-icon-wrap">
            <LockKeyhole size={16} className="field-icon" />
          </div>
          <input type="password" placeholder="Confirm new password" className="field-input" />
        </div>
      </div>

      <Button type="submit" className="w-full">Reset Password</Button>
      <p className="text-center text-sm text-ink-900/55">
        Remember your password? <Link to="/login" className="font-semibold text-brand-600 hover:underline">Login here</Link>
      </p>
    </form>
  );
}
