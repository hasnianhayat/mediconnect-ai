import { useState } from 'react';
import { Users, ChevronDown, CalendarDays, Clock3, MoreVertical } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import AppointmentStatus from '../../components/appointments/AppointmentStatus';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { doctorPatients } from '../../data/doctors';

const patientImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];
const filterOptions = ['All Patients', 'Completed', 'Pending', 'Cancelled'];

export default function PatientsQueue() {
  const [patients, setPatients] = useState(doctorPatients);
  const [activeFilter, setActiveFilter] = useState('All Patients');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const filteredPatients = patients.filter((patient) => activeFilter === 'All Patients' || patient.status === activeFilter);

  const updatePatientStatus = (mrn, status) => {
    setPatients((current) => current.map((patient) => (patient.mrn === mrn ? { ...patient, status } : patient)));
    setMenuOpenId(null);
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Patients / Queue</h1>
          <p className="mt-2 text-sm font-semibold text-ink-900/70">View and manage all your patients in one place.</p>
        </div>

        <Card className="p-4 sm:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-600"><Users size={25} /></span>
              <div>
                <h2 className="font-display text-base font-bold text-brand-600 sm:text-lg">{activeFilter}</h2>
                <p className="text-xs font-semibold text-ink-900/70">All patients including completed appointments and others.</p>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setFilterOpen((prev) => !prev)}
                className="flex items-center gap-8 rounded-xl border border-sand-200 bg-white px-3 py-2 text-xs font-bold text-ink-900 shadow-sm"
              >
                {activeFilter} <ChevronDown size={16} className="text-brand-600" />
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 w-44 rounded-xl border border-sand-200 bg-white p-1 shadow-pop">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setActiveFilter(option);
                        setFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold ${activeFilter === option ? 'bg-brand-50 text-brand-700' : 'text-ink-900/75 hover:bg-sand-50'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[780px] text-left">
              <thead>
                <tr className="text-[11px] font-bold text-ink-900/70">
                  <th className="px-2 py-3">Patient</th>
                  <th className="px-2 py-3">Last Appointment</th>
                  <th className="px-2 py-3">Reason</th>
                  <th className="px-2 py-3">Consultation Type</th>
                  <th className="px-2 py-3">Status</th>
                  <th className="px-2 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={patient.mrn} className="border-t border-sand-100 text-xs font-semibold text-ink-900">
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={patient.name} src={patientImages[index % patientImages.length]} size={42} />
                        <div>
                          <p className="font-bold">{patient.name}</p>
                          <p className="text-[10px] text-ink-900/60">{patient.mrn}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-2 py-3">
                      <div className="flex flex-col gap-1 text-[11px]">
                        <span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{patient.lastVisit.split(' · ')[0]}</span>
                        <span className="flex items-center gap-1"><Clock3 size={13} className="text-brand-600" />{patient.lastVisit.split(' · ')[1]}</span>
                      </div>
                    </td>

                    <td className="px-2 py-3">{patient.reason}</td>
                    <td className="px-2 py-3">{patient.type}</td>
                    <td className="px-2 py-3"><AppointmentStatus status={patient.status} /></td>

                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" onClick={() => setSelectedPatient(patient)} className="!px-4 !py-1.5 !text-[11px]">
                          View Details
                        </Button>
                        <div className="relative">
                          <button
                            type="button"
                            aria-label={`More actions for ${patient.name}`}
                            onClick={() => setMenuOpenId((prev) => (prev === patient.mrn ? null : patient.mrn))}
                            className="grid place-items-center rounded-lg p-1.5 text-ink-900 hover:bg-sand-100"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {menuOpenId === patient.mrn && (
                            <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-sand-200 bg-white p-1 shadow-pop">
                              <button type="button" onClick={() => setSelectedPatient(patient)} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                                View Details
                              </button>
                              <button type="button" onClick={() => updatePatientStatus(patient.mrn, 'Completed')} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                                Mark as Completed
                              </button>
                              <button type="button" onClick={() => updatePatientStatus(patient.mrn, 'Pending')} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                                Mark as Pending
                              </button>
                              <button type="button" onClick={() => updatePatientStatus(patient.mrn, 'Cancelled')} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-coral-500 hover:bg-coral-50">
                                Mark as Cancelled
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {filteredPatients.map((patient, index) => (
              <div key={patient.mrn} className="bg-sand-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={patient.name} src={patientImages[index % patientImages.length]} size={46} />
                    <div>
                      <p className="font-bold text-ink-900">{patient.name}</p>
                      <p className="text-xs text-ink-900/55">{patient.mrn}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      aria-label={`More actions for ${patient.name}`}
                      onClick={() => setMenuOpenId((prev) => (prev === patient.mrn ? null : patient.mrn))}
                      className="grid place-items-center rounded-lg p-1.5 text-ink-900 hover:bg-sand-100"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {menuOpenId === patient.mrn && (
                      <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-sand-200 bg-white p-1 shadow-pop">
                        <button type="button" onClick={() => setSelectedPatient(patient)} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                          View Details
                        </button>
                        <button type="button" onClick={() => updatePatientStatus(patient.mrn, 'Completed')} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                          Mark as Completed
                        </button>
                        <button type="button" onClick={() => updatePatientStatus(patient.mrn, 'Pending')} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                          Mark as Pending
                        </button>
                        <button type="button" onClick={() => updatePatientStatus(patient.mrn, 'Cancelled')} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-coral-500 hover:bg-coral-50">
                          Mark as Cancelled
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-ink-900/70">
                  <span><CalendarDays size={13} className="mr-1 inline text-brand-600" />{patient.lastVisit}</span>
                  <span>{patient.reason}</span>
                  <span>{patient.type}</span>
                  <AppointmentStatus status={patient.status} />
                </div>

                <Button size="sm" variant="outline" onClick={() => setSelectedPatient(patient)} className="mt-3 w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        open={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        title="Patient Details"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>Close</Button>
            <Button size="sm" onClick={() => updatePatientStatus(selectedPatient?.mrn, 'Completed')}>Mark Complete</Button>
          </>
        }
      >
        {selectedPatient && (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={selectedPatient.name} src={patientImages[0]} size={52} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{selectedPatient.name}</p>
                <p className="text-xs font-semibold text-brand-600">{selectedPatient.mrn}</p>
              </div>
            </div>

            <div className="grid gap-3 rounded-xl border border-sand-200 bg-sand-50 p-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Last Appointment</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedPatient.lastVisit}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Status</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedPatient.status}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Reason</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedPatient.reason}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Consultation Type</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedPatient.type}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="mint" onClick={() => updatePatientStatus(selectedPatient.mrn, 'Completed')}>Mark as Completed</Button>
              <Button size="sm" variant="outline" onClick={() => updatePatientStatus(selectedPatient.mrn, 'Pending')}>Mark as Pending</Button>
              <Button size="sm" variant="danger" onClick={() => updatePatientStatus(selectedPatient.mrn, 'Cancelled')}>Mark as Cancelled</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
