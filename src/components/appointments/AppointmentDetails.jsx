import { Calendar, Clock, MapPin, User, Stethoscope, FileText } from 'lucide-react';
import Avatar from '../common/Avatar';
import AppointmentStatus from './AppointmentStatus';

export default function AppointmentDetails({ appt }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-4">
        <Avatar name={appt.doctor || appt.patient} size={60} />
        <div>
          <p className="font-display text-lg font-bold text-ink-900">{appt.doctor || appt.patient}</p>
          <p className="text-sm font-medium text-brand-600">{appt.specialty}</p>
        </div>
        <AppointmentStatus status={appt.status || 'Confirmed'} className="ml-auto" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-sand-200 pt-4 text-sm">
        <Detail icon={Calendar} label="Date" value={appt.date} />
        <Detail icon={Clock} label="Time" value={appt.time} />
        <Detail icon={MapPin} label="Location" value={appt.location} />
        <Detail icon={User} label="Patient" value={appt.patient || 'Ali Khan'} />
        <Detail icon={Stethoscope} label="Reason" value={appt.reason} />
        <Detail icon={FileText} label="Token" value={appt.token || '#DR-250524-1120'} />
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} className="mt-0.5 text-brand-500" />
      <div>
        <p className="text-xs font-semibold text-ink-900/40">{label}</p>
        <p className="font-medium text-ink-900">{value}</p>
      </div>
    </div>
  );
}
