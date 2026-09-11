import { CalendarCheck, CalendarClock, Users, CheckCircle2, FileText, ArrowRight, Star } from 'lucide-react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { doctorAppointmentQueue } from '../../data/doctors';

const stats = [
  { icon: CalendarCheck, label: 'Total Appointments', value: '28', tone: 'brand' },
  { icon: CalendarClock, label: "Today's Appointments", value: '10', tone: 'teal' },
  { icon: Users, label: 'Pending Appointments', value: '6', tone: 'amber' },
  { icon: CheckCircle2, label: 'Patients', value: '152', tone: 'mint' },
];

const feedback = [
  { name: 'Fatima Noor', text: 'Very professional and friendly doctor. Highly recommended!' },
  { name: 'Ahmed Javed', text: 'Excellent treatment and great experience. Thank you!' },
  { name: 'Sara Khan', text: 'Very kind and listens to patients carefully.' },
  { name: 'Usman Sheikh', text: 'Best consultation and proper guidance. Highly satisfied.' },
  { name: 'Hina Mughal', text: 'Great service and very cooperative staff.' },
];

const statTones = {
  brand: 'bg-brand-100 text-brand-600',
  teal: 'bg-teal-400/20 text-teal-600',
  amber: 'bg-amber-400/20 text-amber-500',
  mint: 'bg-mint-400/20 text-mint-500',
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <WelcomeBanner
        name="Doctor Name!"
        tagline="Here's your practice overview. Stay organized and keep caring!"
        illustration={(
          <img
            src="/images/doctor9.png"
            alt="Doctor illustration"
            className="hidden h-full w-full object-contain object-right-bottom sm:block"
          />
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, tone }) => (
          <Card key={label} className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${statTones[tone]}`}>
                <Icon size={28} strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
                <p className="text-xs font-semibold leading-4 text-ink-900/55 sm:text-sm">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-display text-sm font-semibold text-ink-900 sm:text-base">Recent Patient Reports</h3>
            <button className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
              View All Reports <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {[{ p: 'Ali Raza', t: 'Blood Report' }, { p: 'Sara Khan', t: 'X-Ray' }].map((r) => (
              <div key={r.p} className="flex items-center gap-3 rounded-xl bg-sand-50 p-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600"><FileText size={20} /></span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{r.p} — {r.t}</p>
                  <p className="text-xs text-ink-900/55">Uploaded on 22 Oct 2024</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4" icon={ArrowRight} iconPosition="right">View All Reports</Button>
        </Card>
        <Card className="flex flex-col justify-between p-4 sm:p-5">
          <h3 className="font-display text-sm font-semibold text-ink-900 sm:text-base">AI Assistant</h3>
          <div className="mt-3 flex items-center gap-4">
            <img src="/images/ai.png" alt="AI assistant" className="h-24 w-28 shrink-0 object-contain sm:h-28 sm:w-36" />
            <p className="text-xs font-semibold leading-5 text-ink-900 sm:text-sm">Ask me anything about your patients, reports or medical info.</p>
          </div>
          <Button className="mt-3 self-start" icon={ArrowRight} iconPosition="right">Ask AI Assistant</Button>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display font-semibold text-ink-900">Total Appointments</h3>
        </div>
        <div className="space-y-3">
          {doctorAppointmentQueue.map((r, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3 rounded-xl border border-sand-200 p-3">
              <Avatar name={r.patient} size={38} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{r.patient}</p>
                <p className="text-xs text-ink-900/40">{r.date} · {r.time} · {r.reason}</p>
              </div>
              {r.status === 'Pending' ? (
                <div className="flex gap-2">
                  <Button size="sm" variant="mint">Accept</Button>
                  <Button size="sm" variant="danger">Decline</Button>
                </div>
              ) : (
                <>
                  <span className="chip-active">{r.status}</span>
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="secondary">Send Reports</Button>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-ink-900 sm:text-base">Patient Feedback</h3>
          <div className="flex gap-1 text-brand-600"><ArrowRight size={16} className="rotate-180" /><ArrowRight size={16} /></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {feedback.map((f) => (
            <div key={f.name} className="min-w-0 rounded-xl bg-sand-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <Avatar name={f.name} size={38} />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-ink-900">{f.name}</p>
                  <div className="flex text-amber-500"><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /><Star size={11} fill="currentColor" /></div>
                </div>
              </div>
              <p className="text-[11px] leading-4 text-ink-900/60">{f.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
