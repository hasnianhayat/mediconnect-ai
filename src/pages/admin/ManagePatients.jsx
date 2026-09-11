import { Users, UserRound, CalendarDays, Mail, MapPin, FileText } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { adminPatients, regions, cities } from '../../data/doctors';

const patientImages = ['/images/image.png', '/images/image.png', '/images/image.png', '/images/image.png', '/images/fimage.png'];

export default function ManagePatients() {
  return (
    <div>
      <PageHeader icon={Users} title="Manage Patients" subtitle="View, manage and control all registered patients on the platform." />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Users size={23} strokeWidth={2.2} /></span>
        <div><p className="text-xs font-bold text-ink-900/50">Total Patients</p><p className="font-display text-2xl font-bold leading-none text-brand-700">3,892</p></div>
      </div>
      <div className="mb-6">
        <FilterBar
          filters={[{ label: 'All Regions', options: regions }, { label: 'All Cities', options: cities }, { label: 'All Status', options: ['Active', 'Blocked'] }]}
          searchPlaceholder="Search by name, father name, email..."
        />
      </div>
      <Card>
        <div className="hidden overflow-hidden lg:block">
          <table className="w-full table-fixed text-left text-[10px] xl:text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="w-10 py-3 pr-3">#</th>
                <th className="py-3 pr-4">Patient</th>
                <th className="py-3 pr-4">Father Name</th>
                <th className="py-3 pr-4">Age</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Region</th>
                <th className="py-3 pr-4">City</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminPatients.map((p, index) => (
                <tr key={p.mrn} className="border-b border-sand-100 last:border-0">
                  <td className="py-3 pr-3 text-xs font-semibold text-ink-900/70">{index + 1}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} src={patientImages[index % patientImages.length]} size={38} />
                      <div><p className="font-semibold text-ink-900">{p.name}</p><p className="text-xs text-ink-900/40">{p.mrn}</p></div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-2 text-xs font-semibold text-ink-900/70"><UserRound size={15} className="text-brand-600" />{p.father}</span></td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-2 text-xs font-semibold text-ink-900/70"><CalendarDays size={15} className="text-brand-600" />{p.age}</span></td>
                  <td className="py-3 pr-4"><span className="flex max-w-[190px] items-center gap-2 truncate text-xs font-semibold text-ink-900/70"><Mail size={15} className="shrink-0 text-brand-600" />{p.email}</span></td>
                  <td className="py-3 pr-4"><span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${p.region === 'Punjab' ? 'bg-brand-100 text-brand-700' : p.region === 'Sindh' ? 'bg-mint-400/15 text-mint-500' : 'bg-purple-100 text-purple-700'}`}>{p.region}</span></td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-2 text-xs font-semibold text-ink-900/70"><MapPin size={15} className="text-brand-600" />{p.city}</span></td>
                  <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="danger">Block</Button>
                      <Button size="sm" variant="secondary">Send Reports</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {adminPatients.map((p, index) => (
            <article key={p.mrn} className="rounded-xl bg-sand-50 p-4">
              <div className="flex items-start gap-3">
                <span className="pt-2 text-xs font-bold text-ink-900/45">{index + 1}</span>
                <Avatar name={p.name} src={patientImages[index % patientImages.length]} size={44} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink-900">{p.name}</p><p className="text-xs text-ink-900/45">{p.mrn} · {p.phone}</p><StatusBadge status={p.status} className="mt-2" /></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <span className="flex min-w-0 items-center gap-2 text-ink-900/70"><UserRound size={15} className="shrink-0 text-brand-600" /><span className="truncate">{p.father}</span></span>
                <span className="flex items-center gap-2 text-ink-900/70"><CalendarDays size={15} className="text-brand-600" />Age {p.age}</span>
                <span className="flex min-w-0 items-center gap-2 text-ink-900/70"><Mail size={15} className="shrink-0 text-brand-600" /><span className="truncate">{p.email}</span></span>
                <span className="flex items-center gap-2 text-ink-900/70"><MapPin size={15} className="text-brand-600" />{p.city}, {p.region}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="outline">View Profile</Button><Button size="sm" variant="danger">Block Profile</Button><Button size="sm" variant="secondary" icon={FileText}>Send Reports</Button></div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
