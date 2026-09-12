import { useRef, useState } from 'react';
import { User, Camera, Link2, Save, Lock, Eye, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import { regions, cities, specialties } from '../../data/doctors';

const initialProfile = {
  fullName: 'Dr. Ali Raza',
  specialty: 'Cardiologist',
  bio: 'Experienced Cardiologist with over 8 years of experience in diagnosing and treating heart conditions. Committed to providing patient-centered care and improving cardiovascular health.',
  email: 'dr.aliraza@mediconnect.ai',
  mobile: '+92 312 3456789',
  region: 'Punjab',
  city: 'Lahore',
  hospitalAddress: 'City Heart Hospital, 123 Medical Street, Gulberg III, Lahore, Punjab, Pakistan',
  qualification: 'MBBS, FCPS (Cardiology)',
  specialization: 'Interventional Cardiology',
  note: 'Available for consultation from 10:00 AM to 6:00 PM, Monday to Saturday.',
};

const initialPasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(initialProfile);
  const [avatarSrc, setAvatarSrc] = useState('/images/image.png');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordForm, setPasswordForm] = useState(initialPasswordState);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleProfileChange = (field) => (event) => {
    setProfile((current) => ({ ...current, [field]: event.target.value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setAvatarSrc(String(reader.result || '/images/image.png'));
      setProfileMessage('Profile photo updated successfully.');
    };

    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleSaveProfile = () => {
    setProfileMessage('Profile information saved successfully.');
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleUpdatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.');
      setPasswordMessage('');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      setPasswordMessage('');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      setPasswordMessage('');
      return;
    }

    setPasswordError('');
    setPasswordMessage('Password updated successfully.');
    setPasswordForm(initialPasswordState);
  };

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
            <Avatar name={profile.fullName} src={avatarSrc} size={120} className="mx-auto rounded-full bg-brand-100 object-cover lg:mx-0" />
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handlePhotoChange} />
            <Button variant="secondary" size="sm" icon={Camera} onClick={() => fileInputRef.current?.click()} className="mt-3">Change Photo</Button>
            <p className="mt-2 text-[10px] font-semibold text-ink-900/50">JPG, PNG or WEBP. Max size 2MB.</p>
            {profileMessage && <p className="mt-2 text-[10px] font-bold text-mint-700">{profileMessage}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Full Name" value={profile.fullName} onChange={handleProfileChange('fullName')} />
            <Select label="Specialty" options={specialties} value={profile.specialty} onChange={handleProfileChange('specialty')} />
            <Textarea label="Bio" containerClassName="sm:col-span-2" value={profile.bio} onChange={handleProfileChange('bio')} />
            <Input label="Email" value={profile.email} onChange={handleProfileChange('email')} />
            <Input label="Mobile Number" value={profile.mobile} onChange={handleProfileChange('mobile')} />
            <Select label="Region" options={regions} value={profile.region} onChange={handleProfileChange('region')} />
            <Select label="City" options={cities} value={profile.city} onChange={handleProfileChange('city')} />
            <Textarea label="Hospital Address" containerClassName="sm:col-span-2" value={profile.hospitalAddress} onChange={handleProfileChange('hospitalAddress')} />
            <Input label="Qualification" value={profile.qualification} onChange={handleProfileChange('qualification')} />
            <Input label="Specialization" value={profile.specialization} onChange={handleProfileChange('specialization')} />
            <Input label="Note (Optional)" containerClassName="sm:col-span-2" value={profile.note} onChange={handleProfileChange('note')} />

            <div className="sm:col-span-2">
              <p className="field-label">Social Links</p>
              <div className="flex flex-wrap gap-3 text-brand-600">
                {[1, 2, 3, 4, 5].map((link) => <span key={link} className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50"><Link2 size={18} /></span>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 sm:col-span-2 sm:justify-between">
              <Button variant="outline" icon={Eye} onClick={() => navigate('/patient/doctor-profile/1')}>View as Patient</Button>
              <Button icon={Save} onClick={handleSaveProfile}>Save Profile</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <h2 className="mb-1 font-display text-base font-bold text-brand-600 sm:text-lg">Password Settings</h2>
        <p className="mb-5 text-xs font-semibold text-ink-900/65 sm:text-sm">Update your password to keep your account secure.</p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Input label="Current Password" type="password" placeholder="Enter current password" value={passwordForm.currentPassword} onChange={handlePasswordChange('currentPassword')} />
          <Input label="New Password" type="password" placeholder="Enter new password" value={passwordForm.newPassword} onChange={handlePasswordChange('newPassword')} />
          <Input label="Confirm New Password" type="password" placeholder="Confirm new password" value={passwordForm.confirmPassword} onChange={handlePasswordChange('confirmPassword')} />
        </div>
        <p className="mt-4 flex items-start gap-2 text-[10px] font-semibold leading-5 text-brand-700 sm:text-xs"><Info size={15} className="mt-0.5 shrink-0" />Password must be at least 8 characters long and include a combination of letters, numbers and symbols.</p>
        {passwordError && <p className="mt-3 text-xs font-bold text-coral-600">{passwordError}</p>}
        {passwordMessage && <p className="mt-3 text-xs font-bold text-mint-700">{passwordMessage}</p>}
        <Button icon={Lock} onClick={handleUpdatePassword} className="mt-5 w-full sm:w-auto">Update Password</Button>
      </Card>
    </div>
  );
}
