import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, FileBadge2, IdCard, LockKeyhole, Mail, PhoneCall, Upload, UserRound } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const uploads = [
  { key: 'cnic', label: 'CNIC Card (PDF)' },
  { key: 'license', label: 'PMDC License (PDF)' },
  { key: 'degree', label: 'Medical Degree Certificate (PDF)' },
  { key: 'experience', label: 'Experience Certificate / Hospital Affiliation Letter (PDF)' },
];

export default function DoctorSignupForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <form onSubmit={(e) => { e.preventDefault(); navigate('/verification-pending'); }} className="space-y-3.5">
      <Input label="Full Name" icon={UserRound} required placeholder="Enter your full name" />
      <Input label="Father's Name" icon={UserRound} required placeholder="Enter your father's name" />
      <Input label="CNIC" icon={IdCard} required placeholder="Enter your CNIC number" />
      <Input label="Mobile Number" icon={PhoneCall} required placeholder="Enter your mobile number" />
      <Input label="Email" icon={Mail} type="email" required placeholder="Enter your email" />
      <Input label="PMDC Registration Number" icon={FileBadge2} required placeholder="Enter your PMDC registration number" />

      <div className="space-y-3">
        {uploads.map((u) => (
          <div key={u.key}>
            <label className="field-label">{u.label} <span className="text-coral-500">*</span></label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-sand-200 bg-sand-50 px-4 py-3 text-sm text-brand-600 hover:bg-brand-50">
              <Upload size={16} />
              <span className="font-semibold">Upload {u.label.split(' (')[0]}</span>
              <span className="ml-auto text-xs text-ink-900/40">PDF (Max 5MB)</span>
              <input type="file" accept="application/pdf" className="hidden" />
            </label>
          </div>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <PasswordField label="Password" show={showPass} setShow={setShowPass} />
        <PasswordField label="Confirm Password" show={showConfirm} setShow={setShowConfirm} />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-900/65">
        <input type="checkbox" required className="h-4 w-4 rounded border-sand-200 text-brand-600" />
        I agree to the <Link to="#" className="font-semibold text-brand-600">Terms & Conditions</Link> and <Link to="#" className="font-semibold text-brand-600">Privacy Policy</Link>.
      </label>
      <Button type="submit" className="w-full">Sign Up</Button>
      <p className="text-center text-sm text-ink-900/55">
        Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:underline">Login here</Link>
      </p>
    </form>
  );
}

function PasswordField({ label, show, setShow }) {
  return (
    <div>
      <label className="field-label">{label} <span className="text-coral-500">*</span></label>
      <div className="field-password-shell">
        <div className="field-icon-wrap">
          <LockKeyhole size={16} className="field-icon" />
        </div>
        <input type={show ? 'text' : 'password'} required placeholder={`Enter ${label.toLowerCase()}`} className="field-input" />
        <button type="button" onClick={() => setShow(!show)} className="field-password-toggle" aria-label={show ? 'Hide password' : 'Show password'}>
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
