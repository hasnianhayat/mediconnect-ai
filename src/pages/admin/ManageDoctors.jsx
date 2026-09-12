import { useMemo, useState } from 'react';
import { Stethoscope, UserPlus, Users, HeartPulse, MapPin, CalendarDays, CircleDollarSign } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { adminDoctors, doctors, specialties, cities, regions } from '../../data/doctors';

const initialDoctors = adminDoctors.map((doctor) => ({ ...doctor }));

export default function ManageDoctors() {
  const [doctorList, setDoctorList] = useState(initialDoctors);
  const [filters, setFilters] = useState({
    specialty: 'All Specialties',
    city: 'All Cities',
    status: 'All Status',
    region: 'All Regions',
  });
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [reportMessage, setReportMessage] = useState('');
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: 'Cardiologist',
    city: 'Lahore',
    region: 'Punjab',
    experience: '',
    fee: '',
    status: 'Active',
  });

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return doctorList.filter((doctor) => {
      const matchesSearch = !query || doctor.name.toLowerCase().includes(query);
      const matchesSpecialty = filters.specialty === 'All Specialties' || doctor.specialty === filters.specialty;
      const matchesCity = filters.city === 'All Cities' || doctor.city === filters.city;
      const matchesStatus = filters.status === 'All Status' || doctor.status === filters.status;
      const matchesRegion = filters.region === 'All Regions' || doctor.region === filters.region;

      return matchesSearch && matchesSpecialty && matchesCity && matchesStatus && matchesRegion;
    });
  }, [doctorList, filters, search]);

  const openDoctorModal = (doctor, mode = 'view') => {
    setSelectedDoctor(doctor);
    setModalMode(mode);
    setReportMessage('');
  };

  const blockDoctor = (doctor) => {
    setDoctorList((current) => current.map((item) => (item.mrn === doctor.mrn ? { ...item, status: 'Blocked' } : item)));
    setSelectedDoctor(null);
  };

  const sendDoctorReports = () => {
    if (!selectedDoctor) return;

    setDoctorList((current) => current.map((item) => (item.mrn === selectedDoctor.mrn ? { ...item, status: 'Active' } : item)));
    setSelectedDoctor(null);
    setReportMessage('');
  };

  const handleAddDoctor = () => {
    if (!newDoctor.name.trim() || !newDoctor.experience.trim() || !newDoctor.fee) return;

    const doctorToAdd = {
      name: newDoctor.name,
      mrn: `MRN: ${Math.floor(Math.random() * 9000) + 1000}`,
      specialty: newDoctor.specialty,
      city: newDoctor.city,
      region: newDoctor.region,
      experience: newDoctor.experience,
      fee: Number(newDoctor.fee),
      status: newDoctor.status,
    };

    setDoctorList((current) => [doctorToAdd, ...current]);
    setIsAddDoctorOpen(false);
    setNewDoctor({
      name: '',
      specialty: 'Cardiologist',
      city: 'Lahore',
      region: 'Punjab',
      experience: '',
      fee: '',
      status: 'Active',
    });
  };

  return (
    <div>
      <PageHeader
        icon={Stethoscope}
        title="Manage Doctors"
        subtitle="View, manage and control all registered doctors on the platform."
        action={<Button icon={UserPlus} size="sm" onClick={() => setIsAddDoctorOpen(true)}>Add Doctor</Button>}
      />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Users size={23} strokeWidth={2.2} /></span>
        <div><p className="text-xs font-bold text-ink-900/50">Total Doctors</p><p className="font-display text-2xl font-bold leading-none text-brand-700">{doctorList.length}</p></div>
      </div>
      <div className="mb-6">
        <FilterBar
          filters={[
            { label: 'All Specialties', options: specialties, value: filters.specialty, onChange: (event) => setFilters((current) => ({ ...current, specialty: event.target.value })) },
            { label: 'All Cities', options: cities, value: filters.city, onChange: (event) => setFilters((current) => ({ ...current, city: event.target.value })) },
            { label: 'All Status', options: ['Active', 'Pending Queue', 'Blocked'], value: filters.status, onChange: (event) => setFilters((current) => ({ ...current, status: event.target.value })) },
            { label: 'All Regions', options: regions, value: filters.region, onChange: (event) => setFilters((current) => ({ ...current, region: event.target.value })) },
          ]}
          searchPlaceholder="Search doctor by name..."
          onSearch={(event) => setSearch(event.target.value)}
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
              {filteredDoctors.map((d, index) => (
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
                        <Button size="sm" variant="secondary" onClick={() => openDoctorModal(d, 'view')}>Review Profile</Button>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => openDoctorModal(d, 'view')}>View</Button>
                          <Button size="sm" variant="danger" onClick={() => blockDoctor(d)}>Block</Button>
                          <Button size="sm" variant="secondary" onClick={() => openDoctorModal(d, 'reports')}>Send Reports</Button>
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
          {filteredDoctors.map((d, index) => (
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
                {d.status === 'Pending Queue' ? (
                  <Button size="sm" variant="secondary" onClick={() => openDoctorModal(d, 'view')}>Review Profile</Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => openDoctorModal(d, 'view')}>View Profile</Button>
                    <Button size="sm" variant="danger" onClick={() => blockDoctor(d)}>Block Profile</Button>
                    <Button size="sm" variant="secondary" onClick={() => openDoctorModal(d, 'reports')}>Send Reports</Button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Modal
        open={Boolean(selectedDoctor)}
        onClose={() => setSelectedDoctor(null)}
        title={modalMode === 'reports' ? 'Send Report' : 'Doctor Details'}
        footer={
          modalMode === 'reports' ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedDoctor(null)}>Close</Button>
              <Button size="sm" onClick={sendDoctorReports}>Send</Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setSelectedDoctor(null)}>Close</Button>
          )
        }
      >
        {selectedDoctor && modalMode === 'reports' ? (
          <div className="space-y-3">
            <p className="text-sm text-ink-900/70">Send a report to <span className="font-semibold text-ink-900">{selectedDoctor.name}</span>.</p>
            <textarea
              value={reportMessage}
              onChange={(event) => setReportMessage(event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-brand-400"
              placeholder="Write the report message..."
            />
          </div>
        ) : selectedDoctor ? (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={selectedDoctor.name} src={doctors.find((doctor) => doctor.name === selectedDoctor.name)?.image} size={52} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{selectedDoctor.name}</p>
                <p className="text-xs font-semibold text-brand-600">{selectedDoctor.mrn}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Specialty</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.specialty}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Experience</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.experience}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">City</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.city}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Region</p><p className="mt-1 font-semibold text-ink-900">{selectedDoctor.region}</p></div>
              <div className="sm:col-span-2"><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Consultation Fee</p><p className="mt-1 font-semibold text-ink-900">PKR {selectedDoctor.fee.toLocaleString()}</p></div>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={isAddDoctorOpen}
        onClose={() => setIsAddDoctorOpen(false)}
        title="Add Doctor"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddDoctorOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAddDoctor}>Save</Button>
          </>
        }
      >
        <div className="space-y-3">
          <input value={newDoctor.name} onChange={(event) => setNewDoctor((current) => ({ ...current, name: event.target.value }))} placeholder="Doctor name" className="field-input w-full" />
          <div className="grid gap-3 sm:grid-cols-2">
            <select value={newDoctor.specialty} onChange={(event) => setNewDoctor((current) => ({ ...current, specialty: event.target.value }))} className="field-input w-full">
              {specialties.map((specialty) => <option key={specialty} value={specialty}>{specialty}</option>)}
            </select>
            <input value={newDoctor.experience} onChange={(event) => setNewDoctor((current) => ({ ...current, experience: event.target.value }))} placeholder="Experience" className="field-input w-full" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select value={newDoctor.city} onChange={(event) => setNewDoctor((current) => ({ ...current, city: event.target.value }))} className="field-input w-full">
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
            <select value={newDoctor.region} onChange={(event) => setNewDoctor((current) => ({ ...current, region: event.target.value }))} className="field-input w-full">
              {regions.map((region) => <option key={region} value={region}>{region}</option>)}
            </select>
          </div>
          <input value={newDoctor.fee} onChange={(event) => setNewDoctor((current) => ({ ...current, fee: event.target.value }))} placeholder="Consultation fee" className="field-input w-full" />
        </div>
      </Modal>
    </div>
  );
}
