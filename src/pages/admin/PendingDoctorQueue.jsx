import { Clock } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import ApprovalActions from '../../components/admin/ApprovalActions';
import { pendingDoctorQueue, specialties, regions } from '../../data/doctors';

export default function PendingDoctorQueue() {
  return (
    <div>
      <PageHeader icon={Clock} title="Pending Doctor Queue" subtitle="Review and verify doctors who are waiting for approval." />
      <div className="mb-6">
        <FilterBar
          filters={[{ label: 'All Specialties', options: specialties }, { label: 'All Regions', options: regions }]}
          searchPlaceholder="Search by name, speciality, hospital..."
        />
      </div>
      <div className="space-y-4">
        {pendingDoctorQueue.map((d) => (
          <Card key={d.mrn} className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3">
              <Avatar name={d.name} size={44} />
              <div>
                <p className="font-semibold text-ink-900">{d.name}</p>
                <p className="text-xs text-ink-900/45">{d.specialty} · {d.city}, {d.region}</p>
                <p className="text-xs text-ink-900/35">{d.hospital} · PKR {d.fee} · {d.phone}</p>
              </div>
            </div>
            <ApprovalActions />
          </Card>
        ))}
      </div>
    </div>
  );
}
