import { useMemo, useState } from 'react';
import { Clock } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import ApprovalActions from '../../components/admin/ApprovalActions';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { pendingDoctorQueue, specialties, regions } from '../../data/doctors';

export default function PendingDoctorQueue() {
  const [queue, setQueue] = useState(pendingDoctorQueue);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All Specialties');
  const [regionFilter, setRegionFilter] = useState('All Regions');

  const filteredQueue = useMemo(() => {
    const query = search.trim().toLowerCase();

    return queue.filter((doctor) => {
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.hospital.toLowerCase().includes(query);

      const matchesSpecialty = specialtyFilter === 'All Specialties' || doctor.specialty === specialtyFilter;
      const matchesRegion = regionFilter === 'All Regions' || doctor.region === regionFilter;

      return matchesSearch && matchesSpecialty && matchesRegion;
    });
  }, [queue, regionFilter, search, specialtyFilter]);

  const handleAccept = (doctor) => {
    setQueue((current) => current.filter((item) => item.mrn !== doctor.mrn));
    setSelectedDoctor(null);
  };

  const handleDecline = (doctor) => {
    setQueue((current) => current.filter((item) => item.mrn !== doctor.mrn));
    setSelectedDoctor(null);
  };

  const handleVerify = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div>
      <PageHeader icon={Clock} title="Pending Doctor Queue" subtitle="Review and verify doctors who are waiting for approval." />
      <div className="mb-6">
        <FilterBar
          filters={[
            { label: 'All Specialties', options: specialties, value: specialtyFilter, onChange: (event) => setSpecialtyFilter(event.target.value) },
            { label: 'All Regions', options: regions, value: regionFilter, onChange: (event) => setRegionFilter(event.target.value) },
          ]}
          searchPlaceholder="Search by name, speciality, hospital..."
          onSearch={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="space-y-4">
        {filteredQueue.map((d) => (
          <Card key={d.mrn} className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3">
              <Avatar name={d.name} size={44} />
              <div>
                <p className="font-semibold text-ink-900">{d.name}</p>
                <p className="text-xs text-ink-900/45">{d.specialty} · {d.city}, {d.region}</p>
                <p className="text-xs text-ink-900/35">{d.hospital} · PKR {d.fee} · {d.phone}</p>
              </div>
            </div>
            <ApprovalActions
              onAccept={() => handleAccept(d)}
              onDecline={() => handleDecline(d)}
              onVerify={() => handleVerify(d)}
              onViewDetail={() => setSelectedDoctor(d)}
            />
          </Card>
        ))}
      </div>

      <Modal
        open={Boolean(selectedDoctor)}
        onClose={() => setSelectedDoctor(null)}
        title={selectedDoctor ? `${selectedDoctor.name} Details` : 'Doctor Details'}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedDoctor(null)}>Close</Button>
            <Button size="sm" onClick={() => handleAccept(selectedDoctor)}>Approve</Button>
          </>
        }
      >
        {selectedDoctor && (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={selectedDoctor.name} size={52} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{selectedDoctor.name}</p>
                <p className="text-xs font-semibold text-brand-600">{selectedDoctor.mrn}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Specialty</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.specialty}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Region</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.region}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">City</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.city}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Hospital</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.hospital}</p></div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Contact</p>
              <p className="mt-1 font-semibold text-ink-900">{selectedDoctor.phone}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
