import { Users, ChevronDown, CalendarDays, Clock3, MoreVertical } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import AppointmentStatus from '../../components/appointments/AppointmentStatus';
import Button from '../../components/common/Button';
import { doctorPatients } from '../../data/doctors';

const patientImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];

export default function PatientsQueue() {
  return (
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
              <h2 className="font-display text-base font-bold text-brand-600 sm:text-lg">All Patients</h2>
              <p className="text-xs font-semibold text-ink-900/70">All patients including completed appointments and others.</p>
            </div>
          </div>
          <button className="flex items-center gap-8 text-xs font-bold text-ink-900">
            All Patients <ChevronDown size={16} className="text-brand-600" />
          </button>
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[780px] text-left">
            <thead><tr className="text-[11px] font-bold text-ink-900/70"><th className="px-2 py-3">Patient</th><th className="px-2 py-3">Last Appointment</th><th className="px-2 py-3">Reason</th><th className="px-2 py-3">Consultation Type</th><th className="px-2 py-3">Status</th><th className="px-2 py-3">Actions</th></tr></thead>
            <tbody>
              {doctorPatients.map((patient, index) => (
                <tr key={patient.mrn} className="border-t border-sand-100 text-xs font-semibold text-ink-900">
                  <td className="px-2 py-3"><div className="flex items-center gap-3"><Avatar name={patient.name} src={patientImages[index % patientImages.length]} size={42} /><div><p className="font-bold">{patient.name}</p><p className="text-[10px] text-ink-900/60">{patient.mrn}</p></div></div></td>
                  <td className="px-2 py-3"><div className="flex flex-col gap-1 text-[11px]"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{patient.lastVisit.split(' · ')[0]}</span><span className="flex items-center gap-1"><Clock3 size={13} className="text-brand-600" />{patient.lastVisit.split(' · ')[1]}</span></div></td>
                  <td className="px-2 py-3">{patient.reason}</td><td className="px-2 py-3">{patient.type}</td><td className="px-2 py-3"><AppointmentStatus status={patient.status} /></td>
                  <td className="px-2 py-3"><div className="flex items-center gap-3"><Button size="sm" variant="outline" className="!px-4 !py-1.5 !text-[11px]">View Details</Button><MoreVertical size={18} className="text-ink-900" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3 md:hidden">
          {doctorPatients.map((patient, index) => (
            <div key={patient.mrn} className="bg-sand-50 p-4">
              <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><Avatar name={patient.name} src={patientImages[index % patientImages.length]} size={46} /><div><p className="font-bold text-ink-900">{patient.name}</p><p className="text-xs text-ink-900/55">{patient.mrn}</p></div></div><MoreVertical size={18} /></div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-ink-900/70"><span><CalendarDays size={13} className="mr-1 inline text-brand-600" />{patient.lastVisit}</span><span>{patient.reason}</span><span>{patient.type}</span><AppointmentStatus status={patient.status} /></div>
              <Button size="sm" variant="outline" className="mt-3 w-full">View Details</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
