import { FileBarChart, Eye, Reply, ArrowRight, CalendarDays, Clock3, CheckSquare, Square } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

const reports = [
  { from: 'Sara Khan (Patient)', to: 'Dr. Ali Raza (Doctor)', subject: 'Please review my blood test report at your earliest.', date: '25 May 2026 · 10:30 AM', priority: 'Normal' },
  { from: 'Dr. Usman Tariq (Doctor)', to: 'Ayesha Malik (Patient)', subject: 'Sharing your X-Ray report. Please check and follow.', date: '24 May 2026 · 09:15 AM', priority: 'Higher' },
  { from: 'Fatima Rizvi (Patient)', to: 'Dr. Fatima Rizvi (Doctor)', subject: 'Attached is my MRI report for your review.', date: '24 May 2026 · 04:20 PM', priority: 'Normal' },
];

function parsePerson(value) {
  const match = value.match(/^(.*) \((.*)\)$/);
  return { name: match?.[1] || value, role: match?.[2] || '' };
}

function personImage(person) {
  return person.role === 'Patient' ? '/images/fimage.png' : '/images/image.png';
}

function PriorityDisplay({ priority }) {
  return (
    <div className="space-y-1 text-[10px] font-semibold">
      <span className={`flex items-center gap-1 ${priority === 'Higher' ? 'text-coral-500' : 'text-ink-900/55'}`}>{priority === 'Higher' ? <CheckSquare size={14} /> : <Square size={14} />}Higher Priority</span>
      <span className={`flex items-center gap-1 ${priority === 'Normal' ? 'text-mint-500' : 'text-ink-900/55'}`}>{priority === 'Normal' ? <CheckSquare size={14} /> : <Square size={14} />}Normal</span>
    </div>
  );
}

export default function Reports() {
  return (
    <div>
      <PageHeader icon={FileBarChart} title="Reports" subtitle="All reports exchanged between doctors and patients." />
      <div className="mb-5 flex items-center justify-end gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-100 text-brand-600"><FileBarChart size={23} strokeWidth={2.2} /></span>
        <div><p className="text-xs font-bold text-ink-900/50">Total Reports</p><p className="font-display text-2xl font-bold leading-none text-brand-700">156</p></div>
      </div>
      <div className="mb-6">
        <FilterBar filters={[{ label: 'All Direction', options: ['Sent', 'Received'] }, { label: 'All Priority', options: ['Normal', 'Higher'] }, { label: 'All Dates', options: ['Today', 'This Week', 'This Month'] }]} searchPlaceholder="Search by name, email or subject..." />
      </div>
      <Card>
        <div className="hidden overflow-hidden lg:block">
          <table className="w-full table-fixed text-left text-[10px] xl:text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="w-10 py-3 pr-3">#</th>
                <th className="py-3 pr-4">From</th>
                <th className="w-8 py-3 pr-2" />
                <th className="py-3 pr-4">To</th>
                <th className="py-3 pr-4">Subject / Message</th>
                <th className="py-3 pr-4">Sent Date & Time</th>
                <th className="py-3 pr-4">Priority</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => {
                const from = parsePerson(r.from);
                const to = parsePerson(r.to);
                const [date, time] = r.date.split(' · ');
                return (
                <tr key={i} className="border-b border-sand-100 last:border-0">
                  <td className="py-3 pr-3 text-xs font-semibold text-ink-900/70">{i + 1}</td>
                  <td className="py-3 pr-4"><div className="flex min-w-0 items-center gap-2"><Avatar name={from.name} src={personImage(from)} size={34} /><div className="min-w-0"><p className="truncate font-semibold text-ink-900">{from.name}</p><p className="text-[9px] text-ink-900/45">{from.role}</p></div></div></td>
                  <td className="py-3 pr-2 text-center"><ArrowRight size={17} className="text-brand-600" /></td>
                  <td className="py-3 pr-4"><div className="flex min-w-0 items-center gap-2"><Avatar name={to.name} src={personImage(to)} size={34} /><div className="min-w-0"><p className="truncate font-semibold text-ink-900">{to.name}</p><p className="text-[9px] text-ink-900/45">{to.role}</p></div></div></td>
                  <td className="py-3 pr-4 truncate font-semibold text-ink-900/70">{r.subject}</td>
                  <td className="py-3 pr-4"><span className="text-xs font-semibold text-ink-900/70"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{date}</span><span className="mt-1 flex items-center gap-1 text-[10px] text-ink-900/55"><Clock3 size={12} className="text-brand-600" />{time}</span></span></td>
                  <td className="py-3 pr-4"><PriorityDisplay priority={r.priority} /></td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" icon={Eye}>View</Button>
                      <Button size="sm" variant="secondary" icon={Reply}>Reply</Button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {reports.map((r, i) => {
            const from = parsePerson(r.from);
            const to = parsePerson(r.to);
            return <article key={i} className="rounded-xl bg-sand-50 p-4">
              <div className="flex items-start gap-3"><span className="pt-2 text-xs font-bold text-ink-900/45">{i + 1}</span><Avatar name={from.name} src={personImage(from)} size={42} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink-900">{from.name}</p><p className="text-xs text-ink-900/45">{from.role}</p><div className="mt-2 flex items-center gap-2 text-xs font-semibold text-ink-900/70"><ArrowRight size={14} className="text-brand-600" />{to.name} <span className="text-ink-900/45">({to.role})</span></div></div></div>
              <p className="mt-4 text-xs font-semibold leading-5 text-ink-900/75">{r.subject}</p><div className="mt-3 flex items-center justify-between gap-3"><span className="flex items-center gap-1 text-[10px] text-ink-900/60"><CalendarDays size={13} className="text-brand-600" />{r.date}</span><PriorityDisplay priority={r.priority} /></div>
              <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="outline" icon={Eye}>View</Button><Button size="sm" variant="secondary" icon={Reply}>Reply</Button></div>
            </article>;
          })}
        </div>
      </Card>
    </div>
  );
}
