import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, Eye, EyeOff, LockKeyhole, Mail, PhoneCall, UserRound, VenusAndMars } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

export default function PatientSignupForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <form onSubmit={(e) => { e.preventDefault(); navigate('/patient/dashboard'); }} className="space-y-3.5">
      <Input label="Full Name" icon={UserRound} required placeholder="Enter your full name" />
      <Input label="Father Name" icon={UserRound} required placeholder="Enter your father name" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Age" icon={CalendarDays} required placeholder="Enter your age" />
        <Select label="Gender" icon={VenusAndMars} required placeholder="Select your gender" options={['Male', 'Female', 'Other']} />
      </div>
      <Input label="Mobile Number" icon={PhoneCall} required placeholder="Enter your mobile number" />
      <Input label="Email" icon={Mail} type="email" required placeholder="Enter your email" />
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
