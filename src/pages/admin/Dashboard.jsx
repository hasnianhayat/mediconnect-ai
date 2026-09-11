import { Stethoscope, Users, CalendarCheck, Clock, AlertTriangle, ShieldCheck, FileText, CalendarDays, UserRound, MessageCircleWarning, ChevronRight } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import AdminStatCard from '../../components/admin/AdminStatCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { doctors, pendingDoctorQueue } from '../../data/doctors';

const stats = [
  { icon: Stethoscope, label: 'Total Doctors', value: '248', trend: '+12%', tone: 'text-brand-600 bg-brand-100' },
  { icon: Users, label: 'Total Patients', value: '3,892', trend: '+18%', tone: 'text-mint-500 bg-mint-400/15' },
  { icon: CalendarCheck, label: 'Appointments', value: '1,245', trend: '+22%', tone: 'text-teal-600 bg-teal-400/15' },
  { icon: Clock, label: 'Doctor Pending Queue', value: '48', trend: '+8%', tone: 'text-amber-500 bg-amber-400/15' },
  { icon: AlertTriangle, label: 'Open Complaints', value: '17', trend: '-5%', tone: 'text-coral-500 bg-coral-400/15' },
];

const activity = [
  { icon: UserRound, who: 'Dr. Waqas Ahmed', what: 'sent Lab Report to Sara Khan', time: '2 mins ago', tone: 'text-brand-600 bg-brand-100' },
  { icon: FileText, who: 'Sara Khan', what: 'received a blood test report from Dr. Waqas Ahmed', time: '12 mins ago', tone: 'text-brand-600 bg-brand-100' },
  { icon: CalendarDays, who: 'Ahmed Raza', what: 'booked an appointment with Dr. Ayesha Malik', time: '25 mins ago', tone: 'text-brand-600 bg-brand-100' },
  { icon: FileText, who: 'Dr. Ayesha Malik', what: 'sent X-Ray Report to Fatima Noor', time: '38 mins ago', tone: 'text-brand-600 bg-brand-100' },
  { icon: MessageCircleWarning, who: 'Fatima Noor', what: 'submitted a complaint', time: '1 hour ago', tone: 'text-coral-500 bg-coral-400/15' },
  { icon: FileText, who: 'Admin', what: 'generated monthly report', time: '2 hours ago', tone: 'text-brand-600 bg-brand-100' },
  { icon: UserRound, who: 'Dr. Usman Tariq', what: 'joined the platform', time: '3 hours ago', tone: 'text-brand-600 bg-brand-100' },
];

const reports = [
  { who: 'Dr. Waqas Ahmed', patient: 'Sara Khan', title: 'Lab Report', date: 'Oct 25, 2024 · 09:00 AM' },
  { who: 'Sara Khan', patient: 'Dr. Waqas Ahmed', title: 'Blood Test Report', date: 'Oct 24, 2024 · 10:15 AM' },
  { who: 'Dr. Ayesha Malik', patient: 'Fatima Noor', title: 'X-Ray Report', date: 'Oct 22, 2024 · 03:45 PM' },
  { who: 'Ahmed Raza', patient: 'Dr. Usman Tariq', title: 'Prescription', date: 'Oct 21, 2024 · 11:30 AM' },
  { who: 'Fatima Noor', patient: 'Dr. Ayesha Malik', title: 'MRI Report', date: 'Oct 20, 2024 · 04:20 PM' },
  { who: 'Bilal Ahmed', patient: 'Sara Khan', title: 'Follow-up Report', date: 'Oct 18, 2024 · 09:15 AM' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name="Admin Panel" size={56} className="!rounded-2xl" />
          <div>
            <h1 className="font-display text-xl font-bold text-ink-900">Welcome Admin Panel</h1>
            <p className="text-sm text-ink-900/55">Manage your platform, doctors, patients and appointments efficiently.</p>
          </div>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-mint-400/10 px-4 py-2 text-xs font-semibold text-mint-500">
          <ShieldCheck size={15} /> Better Healthcare for a Healthier Tomorrow
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => <AdminStatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-1 font-display font-semibold text-ink-900">Appointment Overview</h3>
          <p className="mb-5 text-sm text-ink-900/50">This month's trend across the platform.</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="font-display text-2xl font-bold text-ink-900">3,842</p><p className="text-xs text-ink-900/45">Total</p></div>
            <div><p className="font-display text-2xl font-bold text-mint-500">2,650</p><p className="text-xs text-ink-900/45">Completed</p></div>
            <div><p className="font-display text-2xl font-bold text-coral-500">1,192</p><p className="text-xs text-ink-900/45">Cancelled</p></div>
          </div>
          <div className="relative mt-6 h-40 overflow-hidden rounded-lg bg-sand-50/60 px-2 pt-2 sm:h-48 sm:px-4">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-4">
              {[1000, 750, 500, 250, 0].map((value) => <span key={value} className="relative border-t border-dashed border-sand-200"><b className="absolute -left-1 -top-2 -translate-x-full text-[9px] font-semibold text-ink-900/40">{value}</b></span>)}
            </div>
            <svg viewBox="0 0 600 150" preserveAspectRatio="none" className="relative h-full w-full" role="img" aria-label="Appointment trends for this month">
              <polyline points="0,112 67,100 133,72 200,88 267,58 333,82 400,48 467,52 533,20 600,55" fill="none" stroke="#2447c9" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              <polyline points="0,132 67,126 133,112 200,119 267,102 333,117 400,98 467,102 533,80 600,92" fill="none" stroke="#008a57" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              <polyline points="0,145 67,142 133,134 200,138 267,130 333,139 400,127 467,133 533,112 600,124" fill="none" stroke="#e85b55" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute inset-x-3 bottom-1 flex justify-between text-[9px] font-semibold text-ink-900/40 sm:inset-x-5"><span>May 1</span><span>May 5</span><span>May 9</span><span>May 13</span><span>May 17</span><span>May 18</span></div>
          </div>
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-semibold text-ink-900">Doctor Pending Queue</h3>
            <button className="text-xs font-semibold text-brand-600 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {pendingDoctorQueue.slice(0, 5).map((d) => (
              <div key={d.mrn} className="flex items-center gap-3">
                <Avatar name={d.name} src={doctors.find((doctor) => doctor.name === d.name)?.image} size={34} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">{d.name}</p>
                  <p className="text-xs text-ink-900/40">{d.specialty}</p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="min-w-0 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display font-semibold text-ink-900"><CalendarDays size={17} className="text-brand-600" />Recent Activity</h3>
            <button className="text-xs font-semibold text-brand-600 hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {activity.map((item) => {
              const Icon = item.icon;
              const image = doctors.find((doctor) => doctor.name === item.who)?.image;
              return (
                <div key={`${item.who}-${item.time}`} className="flex min-w-0 items-center gap-2 border-b border-sand-100 pb-2 last:border-0 last:pb-0 sm:gap-3">
                  <Avatar name={item.who} src={image} size={30} />
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${item.tone}`}><Icon size={14} /></span>
                  <p className="min-w-0 flex-1 truncate text-[10px] leading-4 text-ink-900/70 sm:text-xs"><span className="font-bold text-ink-900">{item.who}</span> {item.what}</p>
                  <p className="shrink-0 text-[9px] text-ink-900/40 sm:text-[10px]">{item.time}</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="min-w-0 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display font-semibold text-ink-900"><FileText size={17} className="text-brand-600" />Reports</h3>
            <button className="text-xs font-semibold text-brand-600 hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {reports.map((report) => {
              const image = doctors.find((doctor) => doctor.name === report.who)?.image;
              return (
                <div key={`${report.who}-${report.title}`} className="flex min-w-0 items-center gap-2 border-b border-sand-100 pb-2 last:border-0 last:pb-0 sm:gap-3">
                  <Avatar name={report.who} src={image} size={30} />
                  <div className="min-w-0 flex-1"><p className="truncate text-[10px] font-bold text-ink-900 sm:text-xs">{report.who} <span className="font-normal">→ {report.patient}</span></p><p className="truncate text-[10px] font-semibold text-ink-900/75">{report.title}</p><p className="text-[9px] text-ink-900/45 sm:text-[10px]">{report.date}</p></div>
                  <ChevronRight size={15} className="shrink-0 text-brand-600" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
