import { Stethoscope, UserPlus, Users, HeartPulse, MapPin, CalendarDays, CircleDollarSign } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { adminDoctors, doctors, specialties, cities, regions } from '../../data/doctors';

export default function ManageDoctors() {
  return (
    <div>
      <PageHeader icon={Stethoscope} title="Manage Doctors" subtitle="View, manage and control all registered doctors on the platform." action={<Button icon={UserPlus} size="sm">Add Doctor</Button>} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Users size={23} strokeWidth={2.2} /></span>
        <div><p className="text-xs font-bold text-ink-900/50">Total Doctors</p><p className="font-display text-2xl font-bold leading-none text-brand-700">248</p></div>
      </div>
      <div className="mb-6">
        <FilterBar
          filters={[
            { label: 'All Specialties', options: specialties },
            { label: 'All Cities', options: cities },
            { label: 'All Status', options: ['Active', 'Pending Queue', 'Blocked'] },
            { label: 'All Regions', options: regions },
          ]}
          searchPlaceholder="Search doctor by name..."
        />
      </div>
      <Card>
        <div className="hidden overflow-hidden lg:block">
          <table className="w-full table-fixed text-left text-[10px] xl:text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="w-10 py-3 pr-3">#</th>
                <th className="py-3 pr-4">Doctor</th>
                <th className="py-3 pr-4">Specialty</th>
                <th className="py-3 pr-4">City</th>
                <th className="py-3 pr-4">Region</th>
                <th className="py-3 pr-4">Experience</th>
                <th className="py-3 pr-4">Consultation Fee</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminDoctors.map((d, index) => (
                <tr key={d.mrn} className="border-b border-sand-100 last:border-0">
                  <td className="py-3 pr-3 text-xs font-semibold text-ink-900/70">{index + 1}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={d.name} src={doctors.find((doctor) => doctor.name === d.name)?.image} size={38} />
                      <div><p className="font-semibold text-ink-900">{d.name}</p><p className="text-xs text-ink-900/40">{d.mrn}</p></div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-2 text-xs font-semibold text-ink-900/70"><HeartPulse size={16} className="text-brand-600" />{d.specialty}</span></td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-2 text-xs font-semibold text-ink-900/70"><MapPin size={15} className="text-brand-600" />{d.city}</span></td>
                  <td className="py-3 pr-4"><span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${d.region === 'Punjab' ? 'bg-brand-100 text-brand-700' : d.region === 'Sindh' ? 'bg-mint-400/15 text-mint-500' : d.region === 'KPK' ? 'bg-purple-100 text-purple-700' : 'bg-amber-400/15 text-amber-600'}`}>{d.region}</span></td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-2 text-xs font-semibold text-ink-900/70"><CalendarDays size={15} className="text-brand-600" />{d.experience}</span></td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-2 text-xs font-semibold text-ink-900/70"><CircleDollarSign size={15} className="text-brand-600" />PKR {d.fee.toLocaleString()}</span></td>
                  <td className="py-3 pr-4"><StatusBadge status={d.status} /></td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      {d.status === 'Pending Queue' ? (
                        <Button size="sm" variant="secondary">Review Profile</Button>
                      ) : (
                        <>
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="danger">Block</Button>
                          <Button size="sm" variant="secondary">Send Reports</Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {adminDoctors.map((d, index) => (
            <article key={d.mrn} className="rounded-xl bg-sand-50 p-4">
              <div className="flex items-start gap-3">
                <span className="pt-2 text-xs font-bold text-ink-900/45">{index + 1}</span>
                <Avatar name={d.name} src={doctors.find((doctor) => doctor.name === d.name)?.image} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink-900">{d.name}</p>
                  <p className="text-xs text-ink-900/45">{d.mrn}</p>
                  <StatusBadge status={d.status} className="mt-2" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <span className="flex min-w-0 items-center gap-2 text-ink-900/70"><HeartPulse size={15} className="shrink-0 text-brand-600" /><span className="truncate">{d.specialty}</span></span>
                <span className="flex min-w-0 items-center gap-2 text-ink-900/70"><MapPin size={15} className="shrink-0 text-brand-600" /><span className="truncate">{d.city}, {d.region}</span></span>
                <span className="flex items-center gap-2 text-ink-900/70"><CalendarDays size={15} className="text-brand-600" />{d.experience}</span>
                <span className="flex items-center gap-2 text-ink-900/70"><CircleDollarSign size={15} className="text-brand-600" />PKR {d.fee.toLocaleString()}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.status === 'Pending Queue' ? <Button size="sm" variant="secondary">Review Profile</Button> : <><Button size="sm" variant="outline">View Profile</Button><Button size="sm" variant="danger">Block Profile</Button><Button size="sm" variant="secondary">Send Reports</Button></>}
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
