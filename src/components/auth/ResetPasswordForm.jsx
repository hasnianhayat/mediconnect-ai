import { LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  return (
    <form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }} className="space-y-5">
      <div>
        <label className="field-label">New Password <span className="text-coral-500">*</span></label>
        <div className="field-password-shell">
          <div className="field-icon-wrap">
            <LockKeyhole size={16} className="field-icon" />
          </div>
          <input type="password" required placeholder="Enter new password" className="field-input" />
        </div>
      </div>
      <div>
        <label className="field-label">Confirm New Password <span className="text-coral-500">*</span></label>
        <div className="field-password-shell">
          <div className="field-icon-wrap">
            <LockKeyhole size={16} className="field-icon" />
          </div>
          <input type="password" required placeholder="Confirm new password" className="field-input" />
        </div>
      </div>
      <Button type="submit" className="w-full">Update Password</Button>
    </form>
  );
}
