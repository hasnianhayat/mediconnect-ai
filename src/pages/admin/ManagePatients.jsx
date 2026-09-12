import { useMemo, useState } from 'react';
import { Users, UserRound, CalendarDays, Mail, MapPin, FileText } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { adminPatients, regions, cities } from '../../data/doctors';

const patientImages = ['/images/image.png', '/images/image.png', '/images/image.png', '/images/image.png', '/images/fimage.png'];

export default function ManagePatients() {
  const [patientList, setPatientList] = useState(adminPatients);
  const [filters, setFilters] = useState({
    region: 'All Regions',
    city: 'All Cities',
    status: 'All Status',
  });
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [reportMessage, setReportMessage] = useState('');

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patientList.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.father.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query);

      const matchesRegion = filters.region === 'All Regions' || patient.region === filters.region;
      const matchesCity = filters.city === 'All Cities' || patient.city === filters.city;
      const matchesStatus = filters.status === 'All Status' || patient.status === filters.status;

      return matchesSearch && matchesRegion && matchesCity && matchesStatus;
    });
  }, [filters, patientList, search]);

  const blockPatient = (patient) => {
    setPatientList((current) => current.map((item) => (item.mrn === patient.mrn ? { ...item, status: 'Blocked' } : item)));
    setSelectedPatient(null);
  };

  const handleSendReports = () => {
    setSelectedPatient(null);
    setReportMessage('');
  };

  return (
    <div>
      <PageHeader icon={Users} title="Manage Patients" subtitle="View, manage and control all registered patients on the platform." />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Users size={23} strokeWidth={2.2} /></span>
        <div><p className="text-xs font-bold text-ink-900/50">Total Patients</p><p className="font-display text-2xl font-bold leading-none text-brand-700">{patientList.length}</p></div>
      </div>
      <div className="mb-6">
        <FilterBar
          filters={[
            { label: 'All Regions', options: regions, value: filters.region, onChange: (event) => setFilters((current) => ({ ...current, region: event.target.value })) },
            { label: 'All Cities', options: cities, value: filters.city, onChange: (event) => setFilters((current) => ({ ...current, city: event.target.value })) },
            { label: 'All Status', options: ['Active', 'Blocked'], value: filters.status, onChange: (event) => setFilters((current) => ({ ...current, status: event.target.value })) },
          ]}
          searchPlaceholder="Search by name, father name, email..."
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
              {filteredPatients.map((p, index) => (
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
                      <Button size="sm" variant="outline" onClick={() => { setSelectedPatient(p); setModalMode('view'); }}>View</Button>
                      <Button size="sm" variant="danger" onClick={() => blockPatient(p)}>Block</Button>
                      <Button size="sm" variant="secondary" onClick={() => { setSelectedPatient(p); setModalMode('reports'); }}>Send Reports</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {filteredPatients.map((p, index) => (
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
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => { setSelectedPatient(p); setModalMode('view'); }}>View Profile</Button>
                <Button size="sm" variant="danger" onClick={() => blockPatient(p)}>Block Profile</Button>
                <Button size="sm" variant="secondary" icon={FileText} onClick={() => { setSelectedPatient(p); setModalMode('reports'); }}>Send Reports</Button>
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Modal
        open={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        title={modalMode === 'reports' ? 'Send Reports' : 'Patient Details'}
        footer={
          modalMode === 'reports' ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>Close</Button>
              <Button size="sm" onClick={handleSendReports}>Send</Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setSelectedPatient(null)}>Close</Button>
          )
        }
      >
        {selectedPatient && modalMode === 'reports' ? (
          <div className="space-y-3">
            <p className="text-sm text-ink-900/70">Send a report to <span className="font-semibold text-ink-900">{selectedPatient.name}</span>.</p>
            <textarea
              value={reportMessage}
              onChange={(event) => setReportMessage(event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-brand-400"
              placeholder="Write the report message..."
            />
          </div>
        ) : selectedPatient ? (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={selectedPatient.name} src={patientImages[0]} size={52} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{selectedPatient.name}</p>
                <p className="text-xs font-semibold text-brand-600">{selectedPatient.mrn}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Father Name</p><p className="mt-1 font-semibold text-ink-900">{selectedPatient.father}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Age</p><p className="mt-1 font-semibold text-ink-900">{selectedPatient.age}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Email</p><p className="mt-1 font-semibold text-ink-900">{selectedPatient.email}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Phone</p><p className="mt-1 font-semibold text-ink-900">{selectedPatient.phone}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">City</p><p className="mt-1 font-semibold text-ink-900">{selectedPatient.city}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Region</p><p className="mt-1 font-semibold text-ink-900">{selectedPatient.region}</p></div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
