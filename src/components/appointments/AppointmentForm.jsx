import { CalendarDays, Mail, Phone, Upload, UserRound, UsersRound, VenusAndMars } from 'lucide-react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';

export default function AppointmentForm() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Input label="Patient Name" icon={UserRound} required placeholder="Enter patient name" />
      <Input label="Father / Guardian Name" icon={UsersRound} required placeholder="Enter father / guardian name" />
      <Input label="Age" icon={CalendarDays} required placeholder="Enter age" />
      <Input label="Contact Number" icon={Phone} required placeholder="Enter mobile number" />
      <Textarea label="Reason for Consultation" required placeholder="Describe your problem or reason" containerClassName="sm:col-span-2" />
      <Input label="Email (Optional)" icon={Mail} placeholder="Enter email address" />
      <Select label="Gender (Optional)" icon={VenusAndMars} placeholder="Select gender" options={['Male', 'Female', 'Other']} />
      <div className="sm:col-span-2">
        <label className="field-label">Upload Older Reports (If Available)</label>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-sand-200 bg-sand-50 py-8 text-center hover:bg-brand-50">
          <Upload size={20} className="text-brand-500" />
          <span className="text-sm font-semibold text-brand-600">Click to upload or drag and drop</span>
          <span className="text-xs text-ink-900/40">JPG, PNG, PDF (Max 5MB)</span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}
