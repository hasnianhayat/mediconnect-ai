import { Camera, User } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { regions, cities } from '../../data/doctors';

export default function Profile() {
  return (
    <div>
      <PageHeader icon={User} title="My Profile" subtitle="Manage your personal information and account settings." />
      <Card className="mb-6">
        <h3 className="mb-5 font-display font-semibold text-ink-900">Personal Information</h3>
        <div className="mb-6 flex items-center gap-4">
          <Avatar name="Muhammad Ali" size={72} />
          <Button variant="secondary" size="sm" icon={Camera}>Change Photo</Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Full Name" defaultValue="Muhammad Ali" />
          <Input label="Father Name" defaultValue="Ahmed Ali" />
          <Input label="Age" defaultValue="28" />
          <Input label="CNIC" defaultValue="42201-1234567-1" />
          <Input label="Email Address" required defaultValue="muhammadali@example.com" hint="Email is mandatory" />
          <Input label="Mobile Number" defaultValue="0300-1234567" />
          <Input label="WhatsApp Number (Optional)" defaultValue="0300-7654321" />
          <Select label="Region" options={regions} defaultValue="Punjab" />
          <Select label="City" options={cities} defaultValue="Lahore" />
        </div>
      </Card>
      <Card className="mb-6">
        <h3 className="mb-1 font-display font-semibold text-ink-900">Change Password</h3>
        <p className="mb-5 text-sm text-ink-900/55">Ensure your account is using a long, random password to stay secure.</p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Input label="Current Password" type="password" placeholder="Enter current password" />
          <Input label="New Password" type="password" placeholder="Enter new password" />
          <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
        </div>
      </Card>
      <Button className="w-full sm:w-auto">Save Changes</Button>
    </div>
  );
}
