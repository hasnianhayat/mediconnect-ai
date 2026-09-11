import { CalendarCheck, Clock, Users, CheckCircle2, XCircle, ArrowRight, Send } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { doctorAppointmentQueue } from '../../data/doctors';

const stats = [
  { icon: CalendarCheck, label: 'Total Appointments', value: '128', tone: 'brand' },
  { icon: Clock, label: "Today's Appointments", value: '18', tone: 'teal' },
  { icon: Users, label: 'Pending Appointments', value: '24', tone: 'amber' },
  { icon: CheckCircle2, label: 'Completed Appointments', value: '84', tone: 'mint' },
];

const todayAppointments = doctorAppointmentQueue.slice(0, 5);
const pendingAppointments = [
  { patient: 'Usman Sheikh', mrn: 'MRN: 1027', date: 'Oct 26, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Pending' },
  { patient: 'Hina Mughal', mrn: 'MRN: 1030', date: 'Oct 26, 2024', time: '11:30 AM', reason: 'Follow-up', status: 'Pending' },
  { patient: 'Bilal Ahmed', mrn: 'MRN: 1028', date: 'Oct 27, 2024', time: '01:00 PM', reason: 'X-Ray Review', status: 'Pending' },
  { patient: 'Ayesha Malik', mrn: 'MRN: 1031', date: 'Oct 27, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Pending' },
  { patient: 'Zain Ali', mrn: 'MRN: 1032', date: 'Oct 27, 2024', time: '10:30 AM', reason: 'Follow-up', status: 'Pending' },
];
const cancelledAppointments = [
  { patient: 'Hassan Ali', date: 'Oct 23, 2024', time: '10:00 AM', reason: 'Consultation', status: 'Cancelled' },
  { patient: 'Maria Yousaf', date: 'Oct 22, 2024', time: '11:30 AM', reason: 'Follow-up', status: 'Cancelled' },
  { patient: 'Rameez Khan', date: 'Oct 21, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Cancelled' },
  { patient: 'Sana Batool', date: 'Oct 20, 2024', time: '01:00 PM', reason: 'X-Ray Review', status: 'Cancelled' },
  { patient: 'Imran Sheikh', date: 'Oct 19, 2024', time: '10:30 AM', reason: 'Consultation', status: 'Cancelled' },
];

const patientImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];

function AppointmentRows({ rows, actions = 'view' }) {
  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div key={`${row.patient}-${row.date}`} className="grid gap-3 bg-sand-50 p-3 sm:grid-cols-[minmax(150px,1.1fr)_minmax(130px,1fr)_minmax(110px,1fr)_auto] sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={row.patient} src={patientImages[index % patientImages.length]} size={40} />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-ink-900">{row.patient}</p>
              {row.mrn && <p className="text-[10px] font-semibold text-ink-900/55">{row.mrn}</p>}
            </div>
          </div>
          <p className="text-xs font-semibold text-ink-900"><span className="mr-1 text-brand-600">◷</span>{row.date} · {row.time}</p>
          <p className="text-xs font-semibold text-ink-900">{row.reason}</p>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {actions === 'accept' ? (
              <><Button size="sm" variant="mint">Accept</Button><Button size="sm" variant="danger">Decline</Button></>
            ) : actions === 'send' ? (
              <Button size="sm" icon={Send} className="bg-brand-600 text-white hover:bg-brand-700">Send Reports</Button>
            ) : actions === 'cancelled' ? (
              <span className="text-xs font-bold text-coral-500">Cancelled</span>
            ) : (
              <Button size="sm" variant="outline">View Details</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function AppointmentSection({ title, icon: Icon, tone, rows, actions, linkLabel }) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className={`flex items-center gap-2 font-display text-sm font-bold sm:text-base ${tone}`}><Icon size={22} strokeWidth={2.3} />{title}</h2>
        <button className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline">{linkLabel} <ArrowRight size={14} /></button>
      </div>
      <AppointmentRows rows={rows} actions={actions} />
    </Card>
  );
}

export default function Appointments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-600"><CalendarCheck size={28} /></span>
        <div><h1 className="font-display text-2xl font-bold text-brand-600">Appointments</h1><p className="text-sm font-semibold text-ink-900/60">View and manage all your appointments.</p></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, tone }) => {
          const toneClasses = { brand: 'bg-brand-100 text-brand-600', teal: 'bg-teal-400/20 text-teal-600', amber: 'bg-amber-400/20 text-amber-500', mint: 'bg-mint-400/20 text-mint-500' };
          return <Card key={label} className="p-4 sm:p-5"><div className="flex items-center gap-3"><span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${toneClasses[tone]}`}><Icon size={29} /></span><div><p className="font-display text-2xl font-bold text-ink-900">{value}</p><p className="text-xs font-semibold text-ink-900/55 sm:text-sm">{label}</p></div></div></Card>;
        })}
      </div>

      <AppointmentSection title="Today's Appointments" icon={CalendarCheck} tone="text-brand-600" rows={todayAppointments} actions="accept" linkLabel="View Today's Schedule" />
      <AppointmentSection title="Pending Appointments" icon={Users} tone="text-amber-500" rows={pendingAppointments} actions="accept" linkLabel="View All Pending" />
      <AppointmentSection title="Completed Appointments" icon={CheckCircle2} tone="text-mint-500" rows={doctorAppointmentQueue} actions="send" linkLabel="View All Completed" />
      <AppointmentSection title="Cancelled Appointments" icon={XCircle} tone="text-coral-500" rows={cancelledAppointments} actions="cancelled" linkLabel="View All Cancelled" />
    </div>
  );
}
