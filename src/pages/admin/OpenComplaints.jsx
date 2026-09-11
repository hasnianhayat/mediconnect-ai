import { MessageCircleWarning, Eye, Reply, UserRound, Mail, CalendarDays, Clock3 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { doctors, openComplaints } from '../../data/doctors';

const senderImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png'];

export default function OpenComplaints() {
  return (
    <div>
      <PageHeader icon={MessageCircleWarning} title="Open Complaints" subtitle="These are messages received from the Contact Us form. Respond to users and resolve their queries." />
      <div className="mb-6">
        <FilterBar filters={[{ label: 'All Roles', options: ['Doctor', 'Patient'] }, { label: 'All Status', options: ['Open', 'Resolved'] }, { label: 'All Dates', options: ['Today', 'This Week', 'This Month'] }]} searchPlaceholder="Search by name, email or subject..." />
      </div>
      <Card>
        <div className="hidden overflow-hidden lg:block">
          <table className="w-full table-fixed text-left text-[10px] xl:text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="w-10 py-3 pr-3">#</th>
                <th className="py-3 pr-4">Sender</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Subject</th>
                <th className="py-3 pr-4">Date & Time</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {openComplaints.map((c, i) => (
                <tr key={i} className="border-b border-sand-100 last:border-0">
                  <td className="py-3 pr-3 text-xs font-semibold text-ink-900/70">{i + 1}</td>
                  <td className="py-3 pr-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <Avatar name={c.sender} src={doctors.find((doctor) => doctor.name === c.sender)?.image || senderImages[i % senderImages.length]} size={36} />
                      <div className="min-w-0"><p className="truncate font-semibold text-ink-900">{c.sender}</p><p className="text-[9px] text-ink-900/40">{c.email}</p></div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><Badge tone={c.role === 'Doctor' ? 'mint' : 'brand'} icon={UserRound}>{c.role}</Badge></td>
                  <td className="py-3 pr-4"><span className="flex min-w-0 items-center gap-1 truncate text-xs font-semibold text-ink-900/70"><Mail size={13} className="shrink-0 text-brand-600" />{c.email}</span></td>
                  <td className="py-3 pr-4 truncate font-semibold text-ink-900/70">{c.subject}</td>
                  <td className="py-3 pr-4"><span className="text-xs font-semibold text-ink-900/70"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{c.date}</span><span className="mt-1 flex items-center gap-1 text-[10px] text-ink-900/55"><Clock3 size={12} className="text-brand-600" />{c.time}</span></span></td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" icon={Eye}>View Message</Button>
                      <Button size="sm" variant="secondary" icon={Reply}>Reply</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {openComplaints.map((c, i) => (
            <article key={i} className="rounded-xl bg-sand-50 p-4">
              <div className="flex items-start gap-3"><span className="pt-2 text-xs font-bold text-ink-900/45">{i + 1}</span><Avatar name={c.sender} src={doctors.find((doctor) => doctor.name === c.sender)?.image || senderImages[i % senderImages.length]} size={44} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink-900">{c.sender}</p><p className="truncate text-xs text-ink-900/45">{c.email}</p><Badge tone={c.role === 'Doctor' ? 'mint' : 'brand'} icon={UserRound} className="mt-2">{c.role}</Badge></div></div>
              <div className="mt-4 space-y-2 text-xs"><p className="font-semibold text-ink-900/75">{c.subject}</p><p className="flex items-center gap-2 text-ink-900/60"><CalendarDays size={14} className="text-brand-600" />{c.date} · {c.time}</p></div>
              <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="outline" icon={Eye}>View Message</Button><Button size="sm" variant="secondary" icon={Reply}>Reply</Button></div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
