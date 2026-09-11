import { Calendar } from 'lucide-react';
import Avatar from '../common/Avatar';
import EmptyState from '../common/EmptyState';

export default function RecentAppointments({ items = [] }) {
  if (!items.length) {
    return <EmptyState icon={Calendar} title="No upcoming appointments" description="Book a consultation to see it here." />;
  }
  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl p-3">
          <Avatar name={a.doctor || a.patient} src={a.image} size={40} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink-900">{a.doctor || a.patient}</p>
            <p className="text-xs text-ink-900/45">{a.date} · {a.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
