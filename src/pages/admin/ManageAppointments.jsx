import { useMemo, useState } from 'react';
import { CalendarCheck, UserRound, Stethoscope, HeartPulse, CalendarDays, Clock3, MapPin, CheckSquare } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { doctorAppointmentQueue, doctors, specialties, regions } from '../../data/doctors';

const appointmentDoctors = ['Dr. Waqas Ahmed', 'Dr. Ayesha Malik', 'Dr. Usman Tariq', 'Dr. Fatima Rizvi', 'Dr. Ali Raza'];
const patientImages = ['/images/doctor3.png', '/images/doctor4.png', '/images/doctor5.png', '/images/doctor6.png', '/images/doctor7.png'];

const initialAppointments = doctorAppointmentQueue.map((appointment, index) => ({
  ...appointment,
  doctor: appointmentDoctors[index % appointmentDoctors.length],
  specialty: specialties[index % specialties.length],
  region: regions[index % regions.length],
  priority: index % 2 === 0 ? 'Higher' : 'Normal',
}));

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filters, setFilters] = useState({
    specialty: 'All Specialties',
    doctor: 'All Doctors',
    status: 'All Statuses',
    region: 'All Regions',
  });
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        appointment.patient.toLowerCase().includes(query) ||
        appointment.doctor.toLowerCase().includes(query) ||
        appointment.mrn.toLowerCase().includes(query);

      const matchesSpecialty = filters.specialty === 'All Specialties' || appointment.specialty === filters.specialty;
      const matchesDoctor = filters.doctor === 'All Doctors' || appointment.doctor === filters.doctor;
      const matchesStatus = filters.status === 'All Statuses' || appointment.status === filters.status;
      const matchesRegion = filters.region === 'All Regions' || appointment.region === filters.region;

      return matchesSearch && matchesSpecialty && matchesDoctor && matchesStatus && matchesRegion;
    });
  }, [appointments, filters, search]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div>
      <PageHeader icon={CalendarCheck} title="Manage Appointments" subtitle="View, manage and track all appointments across the platform." />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600"><CalendarCheck size={23} strokeWidth={2.2} /></span>
        <div><p className="text-xs font-bold text-ink-900/50">Total Appointments</p><p className="font-display text-2xl font-bold leading-none text-brand-700">{appointments.length}</p></div>
      </div>
      <div className="mb-6">
        <FilterBar
          filters={[
            { label: 'All Specialties', options: specialties, value: filters.specialty, onChange: (event) => updateFilter('specialty', event.target.value) },
            { label: 'All Doctors', options: appointmentDoctors, value: filters.doctor, onChange: (event) => updateFilter('doctor', event.target.value) },
            { label: 'All Statuses', options: ['Completed', 'Pending', 'Cancelled'], value: filters.status, onChange: (event) => updateFilter('status', event.target.value) },
            { label: 'All Regions', options: regions, value: filters.region, onChange: (event) => updateFilter('region', event.target.value) },
          ]}
          searchPlaceholder="Search by patient, doctor..."
          onSearch={(event) => setSearch(event.target.value)}
        />
      </div>
      <Card>
        <div className="hidden overflow-hidden lg:block">
          <table className="w-full table-fixed text-left text-[10px] xl:text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="w-10 py-3 pr-3">#</th>
                <th className="py-3 pr-4">Patient</th>
                <th className="py-3 pr-4">Doctor</th>
                <th className="py-3 pr-4">Specialty</th>
                <th className="py-3 pr-4">Date & Time</th>
                <th className="py-3 pr-4">Region</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Priority</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((r, i) => (
                <tr key={r.mrn} className="border-b border-sand-100 last:border-0">
                  <td className="py-3 pr-3 text-xs font-semibold text-ink-900/70">{i + 1}</td>
                  <td className="py-3 pr-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <Avatar name={r.patient} src={patientImages[i % patientImages.length]} size={36} />
                      <div className="min-w-0"><p className="truncate font-semibold text-ink-900">{r.patient}</p><p className="text-[9px] text-ink-900/40">{r.mrn}</p></div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><span className="flex min-w-0 items-center gap-1 text-xs font-semibold text-ink-900/70"><Avatar name={r.doctor} src={doctors.find((doctor) => doctor.name === r.doctor)?.image} size={28} /><span className="truncate">{r.doctor}</span></span></td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-1 text-xs font-semibold text-ink-900/70"><HeartPulse size={14} className="text-brand-600" />{r.specialty}</span></td>
                  <td className="py-3 pr-4"><span className="text-xs font-semibold text-ink-900/70"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{r.date}</span><span className="mt-1 flex items-center gap-1 text-[10px] text-ink-900/55"><Clock3 size={12} className="text-brand-600" />{r.time}</span></span></td>
                  <td className="py-3 pr-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${r.region === 'Punjab' ? 'bg-brand-100 text-brand-700' : r.region === 'Sindh' ? 'bg-mint-400/15 text-mint-500' : 'bg-purple-100 text-purple-700'}`}>{r.region}</span></td>
                  <td className="py-3 pr-4"><StatusBadge status={r.status} /></td>
                  <td className="py-3 pr-4"><span className={`flex items-center gap-1 text-[10px] font-semibold ${r.priority === 'Higher' ? 'text-coral-500' : 'text-ink-900/60'}`}><CheckSquare size={14} />{r.priority}</span></td>
                  <td className="py-3 pr-2 text-right"><Button size="sm" variant="outline" onClick={() => setSelectedAppointment(r)}>View Detail</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {filteredAppointments.map((r, i) => (
            <article key={r.mrn} className="rounded-xl bg-sand-50 p-4">
              <div className="flex items-start gap-3">
                <span className="pt-2 text-xs font-bold text-ink-900/45">{i + 1}</span>
                <Avatar name={r.patient} src={patientImages[i % patientImages.length]} size={44} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink-900">{r.patient}</p><p className="text-xs text-ink-900/45">{r.mrn}</p><StatusBadge status={r.status} className="mt-2" /></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <span className="flex min-w-0 items-center gap-2 text-ink-900/70"><Stethoscope size={15} className="shrink-0 text-brand-600" /><span className="truncate">{r.doctor}</span></span>
                <span className="flex items-center gap-2 text-ink-900/70"><HeartPulse size={15} className="text-brand-600" />{r.specialty}</span>
                <span className="flex min-w-0 items-center gap-2 text-ink-900/70"><CalendarDays size={15} className="shrink-0 text-brand-600" /><span className="truncate">{r.date}, {r.time}</span></span>
                <span className="flex items-center gap-2 text-ink-900/70"><MapPin size={15} className="text-brand-600" />{r.region}</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3"><span className={`flex items-center gap-1 text-xs font-semibold ${r.priority === 'Higher' ? 'text-coral-500' : 'text-ink-900/60'}`}><CheckSquare size={15} />{r.priority} Priority</span><Button size="sm" variant="outline" onClick={() => setSelectedAppointment(r)}>View Detail</Button></div>
            </article>
          ))}
        </div>
      </Card>

      <Modal
        open={Boolean(selectedAppointment)}
        onClose={() => setSelectedAppointment(null)}
        title="Appointment Details"
        footer={<Button size="sm" variant="outline" onClick={() => setSelectedAppointment(null)}>Close</Button>}
      >
        {selectedAppointment && (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={selectedAppointment.patient} src={patientImages[0]} size={48} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{selectedAppointment.patient}</p>
                <p className="text-xs font-semibold text-brand-600">{selectedAppointment.mrn}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Doctor</p><p className="mt-1 font-semibold text-ink-900">{selectedAppointment.doctor}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Specialty</p><p className="mt-1 font-semibold text-ink-900">{selectedAppointment.specialty}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Date</p><p className="mt-1 font-semibold text-ink-900">{selectedAppointment.date}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Time</p><p className="mt-1 font-semibold text-ink-900">{selectedAppointment.time}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Region</p><p className="mt-1 font-semibold text-ink-900">{selectedAppointment.region}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Status</p><p className="mt-1 font-semibold text-ink-900">{selectedAppointment.status}</p></div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Reason</p>
              <p className="mt-1 font-semibold text-ink-900">{selectedAppointment.reason}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
