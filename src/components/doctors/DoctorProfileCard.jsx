import { MapPin, GraduationCap, Briefcase, Wallet, Clock, BadgeCheck } from 'lucide-react';
import Avatar from '../common/Avatar';
import DoctorRating from './DoctorRating';

export default function DoctorProfileCard({ doctor, compact = false }) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <Avatar name={doctor.name} src={doctor.image} size={92} className="shrink-0 ring-4 ring-brand-50" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-lg font-bold text-ink-900">{doctor.name}</h3>
            <BadgeCheck size={18} className="shrink-0 fill-brand-50 text-brand-600" />
          </div>
          <p className="text-sm font-bold text-brand-600">{doctor.specialty}</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-ink-900/55">
            <MapPin size={15} className="text-brand-600" /> {doctor.city}, {doctor.region}
          </p>
        </div>
      </div>
      {!compact && <DoctorRating rating={doctor.rating} reviews={doctor.reviews} />}

      <div className="mt-5 space-y-3 border-t border-sand-200 pt-4 text-sm">
        <Row icon={Briefcase} label="Experience" value={doctor.experience} />
        <Row icon={GraduationCap} label="Qualification" value={doctor.qualification} />
        <Row icon={Wallet} label="Consultation Fee" value={`Rs. ${doctor.fee}`} />
        {doctor.availability && <Row icon={Clock} label="Availability" value={doctor.availability} />}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-brand-500"><Icon size={19} strokeWidth={2.2} /></span>
      <div>
        <p className="text-xs font-semibold text-ink-900/45">{label}</p>
        <p className="font-medium text-ink-900">{value}</p>
      </div>
    </div>
  );
}
