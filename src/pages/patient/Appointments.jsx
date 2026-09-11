import { CalendarCheck, ChevronRight, History, Hourglass } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import AppointmentCard from '../../components/appointments/AppointmentCard';
import { patientAppointments } from '../../data/doctors';

export default function Appointments() {
  return (
    <div>
      <PageHeader icon={CalendarCheck} title="My Appointments" subtitle="Manage your appointments easily in one place" />

      <Section title="Upcoming Appointments" count={patientAppointments.upcoming.length} icon={CalendarCheck} tone="brand" action="View All Upcoming Appointments">
        {patientAppointments.upcoming.map((a, i) => <AppointmentCard key={i} appt={a} variant="upcoming" />)}
      </Section>

      <Section title="Pending Appointments" count={patientAppointments.pending.length} icon={Hourglass} tone="amber" action="View All Pending Appointments">
        {patientAppointments.pending.map((a, i) => <AppointmentCard key={i} appt={a} variant="pending" />)}
      </Section>

      <Section title="Appointment History" count={patientAppointments.history.length} icon={History} tone="mint" action="View All History">
        {patientAppointments.history.map((a, i) => <AppointmentCard key={i} appt={a} variant="history" />)}
      </Section>
    </div>
  );
}

function Section({ title, count, icon: Icon, tone, action, children }) {
  const tones = {
    brand: 'text-brand-700 bg-brand-50',
    amber: 'text-amber-500 bg-amber-50',
    mint: 'text-mint-500 bg-mint-50',
  };

  return (
    <section className="card mb-4 !border-0 !shadow-none p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 pb-2">
        <span className={`grid h-6 w-6 place-items-center rounded-md ${tones[tone]}`}><Icon size={14} /></span>
        <h3 className="font-display text-xs font-bold text-ink-900">{title}</h3>
        <span className={`ml-auto grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold ${tones[tone]}`}>{count}</span>
      </div>
      <div className="space-y-2.5">{children}</div>
      <button type="button" className={`mt-3 ml-auto flex items-center text-[10px] font-semibold ${tones[tone].split(' ')[0]} hover:underline`}>
        {action} <ChevronRight size={13} />
      </button>
    </section>
  );
}
