import { User, Camera, Link2, Save, Lock, Eye, Info } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import { regions, cities, specialties } from '../../data/doctors';

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl"><User size={25} className="text-brand-600" />Doctor Profile</h1>
        <p className="mt-2 text-sm font-semibold text-ink-900/70">View and manage your professional profile information.</p>
      </div>

      <Card className="p-4 sm:p-6">
        <h2 className="mb-5 font-display text-base font-bold text-brand-600 sm:text-lg">Profile Information</h2>
        <div className="grid gap-7 lg:grid-cols-[145px_minmax(0,1fr)]">
          <div className="text-center lg:text-left">
            <p className="field-label">Profile Picture</p>
            <Avatar name="Dr. Ali Raza" src="/images/image.png" size={120} className="mx-auto rounded-full bg-brand-100 object-cover lg:mx-0" />
            <Button variant="secondary" size="sm" icon={Camera} className="mt-3">Change Photo</Button>
            <p className="mt-2 text-[10px] font-semibold text-ink-900/50">JPG, PNG or WEBP. Max size 2MB.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Full Name" defaultValue="Dr. Ali Raza" />
            <Select label="Specialty" options={specialties} defaultValue="Cardiologist" />
            <Textarea label="Bio" containerClassName="sm:col-span-2" defaultValue="Experienced Cardiologist with over 8 years of experience in diagnosing and treating heart conditions. Committed to providing patient-centered care and improving cardiovascular health." />
            <Input label="Email" defaultValue="dr.aliraza@mediconnect.ai" />
            <Input label="Mobile Number" defaultValue="+92 312 3456789" />
            <Select label="Region" options={regions} defaultValue="Punjab" />
            <Select label="City" options={cities} defaultValue="Lahore" />
            <Textarea label="Hospital Address" containerClassName="sm:col-span-2" defaultValue="City Heart Hospital, 123 Medical Street, Gulberg III, Lahore, Punjab, Pakistan" />
            <Input label="Qualification" defaultValue="MBBS, FCPS (Cardiology)" />
            <Input label="Specialization" defaultValue="Interventional Cardiology" />
            <Input label="Note (Optional)" containerClassName="sm:col-span-2" defaultValue="Available for consultation from 10:00 AM to 6:00 PM, Monday to Saturday." />

            <div className="sm:col-span-2">
              <p className="field-label">Social Links</p>
              <div className="flex flex-wrap gap-3 text-brand-600">
                {[1, 2, 3, 4, 5].map((link) => <span key={link} className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50"><Link2 size={18} /></span>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 sm:col-span-2 sm:justify-between">
              <Button variant="outline" icon={Eye}>View as Patient</Button>
              <Button icon={Save}>Save Profile</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <h2 className="mb-1 font-display text-base font-bold text-brand-600 sm:text-lg">Password Settings</h2>
        <p className="mb-5 text-xs font-semibold text-ink-900/65 sm:text-sm">Update your password to keep your account secure.</p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Input label="Current Password" type="password" placeholder="Enter current password" />
          <Input label="New Password" type="password" placeholder="Enter new password" />
          <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
        </div>
        <p className="mt-4 flex items-start gap-2 text-[10px] font-semibold leading-5 text-brand-700 sm:text-xs"><Info size={15} className="mt-0.5 shrink-0" />Password must be at least 8 characters long and include a combination of letters, numbers and symbols.</p>
        <Button icon={Lock} className="mt-5 w-full sm:w-auto">Update Password</Button>
      </Card>
    </div>
  );
}
