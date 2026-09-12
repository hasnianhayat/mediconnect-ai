import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CalendarCheck, Clock, Users, CheckCircle2, XCircle, ArrowRight, Send } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { doctorAppointmentQueue } from '../../data/doctors';

const stats = [
  { icon: CalendarCheck, label: 'Total Appointments', value: '128', tone: 'brand' },
  { icon: Clock, label: "Today's Appointments", value: '18', tone: 'teal' },
  { icon: Users, label: 'Pending Appointments', value: '24', tone: 'amber' },
  { icon: CheckCircle2, label: 'Completed Appointments', value: '84', tone: 'mint' },
];

const todayAppointments = doctorAppointmentQueue.slice(0, 5).map((item, index) => ({ ...item, id: `today-${index}` }));
const pendingAppointments = [
  { id: 'pending-1', patient: 'Usman Sheikh', mrn: 'MRN: 1027', date: 'Oct 26, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Pending' },
  { id: 'pending-2', patient: 'Hina Mughal', mrn: 'MRN: 1030', date: 'Oct 26, 2024', time: '11:30 AM', reason: 'Follow-up', status: 'Pending' },
  { id: 'pending-3', patient: 'Bilal Ahmed', mrn: 'MRN: 1028', date: 'Oct 27, 2024', time: '01:00 PM', reason: 'X-Ray Review', status: 'Pending' },
  { id: 'pending-4', patient: 'Ayesha Malik', mrn: 'MRN: 1031', date: 'Oct 27, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Pending' },
  { id: 'pending-5', patient: 'Zain Ali', mrn: 'MRN: 1032', date: 'Oct 27, 2024', time: '10:30 AM', reason: 'Follow-up', status: 'Pending' },
];
const cancelledAppointments = [
  { id: 'cancelled-1', patient: 'Hassan Ali', date: 'Oct 23, 2024', time: '10:00 AM', reason: 'Consultation', status: 'Cancelled' },
  { id: 'cancelled-2', patient: 'Maria Yousaf', date: 'Oct 22, 2024', time: '11:30 AM', reason: 'Follow-up', status: 'Cancelled' },
  { id: 'cancelled-3', patient: 'Rameez Khan', date: 'Oct 21, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Cancelled' },
  { id: 'cancelled-4', patient: 'Sana Batool', date: 'Oct 20, 2024', time: '01:00 PM', reason: 'X-Ray Review', status: 'Cancelled' },
  { id: 'cancelled-5', patient: 'Imran Sheikh', date: 'Oct 19, 2024', time: '10:30 AM', reason: 'Consultation', status: 'Cancelled' },
];

const completedAppointments = doctorAppointmentQueue.map((item, index) => ({ ...item, id: `completed-${index}` }));
const patientImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];

function AppointmentRows({ rows, actions = 'view', onViewDetails, onAccept, onDecline, onSendReports }) {
  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div key={row.id || `${row.patient}-${row.date}`} className="grid gap-3 bg-sand-50 p-3 sm:grid-cols-[minmax(150px,1.1fr)_minmax(130px,1fr)_minmax(110px,1fr)_auto] sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={row.patient} src={patientImages[index % patientImages.length]} size={40} />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-ink-900">{row.patient}</p>
              {row.mrn && <p className="text-[10px] font-semibold text-ink-900/55">{row.mrn}</p>}
            </div>
          </div>
          <p className="text-xs font-semibold text-ink-900"><span className="mr-1 text-brand-600">◷</span>{row.date} · {row.time}</p>
          <p className="text-xs font-semibold text-ink-900">{row.reason}</p>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {actions === 'accept' ? (
              <>
                <Button size="sm" variant="mint" onClick={() => onAccept?.(row)}>Accept</Button>
                <Button size="sm" variant="danger" onClick={() => onDecline?.(row)}>Decline</Button>
              </>
            ) : actions === 'send' ? (
              <Button size="sm" icon={Send} onClick={() => onSendReports?.(row)} className="bg-brand-600 text-white hover:bg-brand-700">
                Send Reports
              </Button>
            ) : actions === 'cancelled' ? (
              <span className="text-xs font-bold text-coral-500">Cancelled</span>
            ) : (
              <Button size="sm" variant="outline" onClick={() => onViewDetails?.(row)}>View Details</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function AppointmentSection({ title, icon: Icon, tone, rows, actions, linkLabel, view, onViewDetails, onAccept, onDecline, onSendReports }) {
  const navigate = useNavigate();

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className={`flex items-center gap-2 font-display text-sm font-bold sm:text-base ${tone}`}><Icon size={22} strokeWidth={2.3} />{title}</h2>
        <button type="button" onClick={() => navigate(`/doctor/appointments?view=${view}`)} className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline">{linkLabel} <ArrowRight size={14} /></button>
      </div>
      <AppointmentRows rows={rows} actions={actions} onViewDetails={onViewDetails} onAccept={onAccept} onDecline={onDecline} onSendReports={onSendReports} />
    </Card>
  );
}

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const [modalState, setModalState] = useState({ open: false, title: '', type: 'details', data: null });
  const [appointments, setAppointments] = useState({
    today: todayAppointments,
    pending: pendingAppointments,
    completed: completedAppointments,
    cancelled: cancelledAppointments,
  });

  const view = searchParams.get('view');

  const sections = [
    { title: "Today's Appointments", icon: CalendarCheck, tone: 'text-brand-600', rows: appointments.today, actions: 'accept', linkLabel: "View Today's Schedule", view: 'today' },
    { title: 'Pending Appointments', icon: Users, tone: 'text-amber-500', rows: appointments.pending, actions: 'accept', linkLabel: 'View All Pending', view: 'pending' },
    { title: 'Completed Appointments', icon: CheckCircle2, tone: 'text-mint-500', rows: appointments.completed, actions: 'send', linkLabel: 'View All Completed', view: 'completed' },
    { title: 'Cancelled Appointments', icon: XCircle, tone: 'text-coral-500', rows: appointments.cancelled, actions: 'cancelled', linkLabel: 'View All Cancelled', view: 'cancelled' },
  ];

  const closeModal = () => {
    setModalState({ open: false, title: '', type: 'details', data: null });
  };

  const openDetails = (row, sectionTitle) => {
    setModalState({ open: true, title: sectionTitle || 'Appointment Details', type: 'details', data: row });
  };

  const handleAccept = (row) => {
    const updatedItem = { ...row, status: 'Accepted' };
    setAppointments((prev) => ({
      ...prev,
      today: prev.today.filter((item) => item.id !== row.id),
      pending: [updatedItem, ...prev.pending],
    }));
    setModalState({ open: true, title: 'Appointment Accepted', type: 'success', data: updatedItem });
  };

  const handleDecline = (row) => {
    setAppointments((prev) => ({
      ...prev,
      today: prev.today.filter((item) => item.id !== row.id),
      cancelled: [
        { ...row, id: `cancelled-${Date.now()}`, status: 'Cancelled' },
        ...prev.cancelled,
      ],
    }));
    setModalState({ open: true, title: 'Appointment Declined', type: 'success', data: row });
  };

  const handleSendReports = (row) => {
    setModalState({ open: true, title: 'Send Reports', type: 'send-report', data: row });
  };

  const handleModalAction = () => {
    if (modalState.type === 'send-report') {
      setModalState({ open: true, title: 'Report Sent', type: 'success', data: modalState.data });
      return;
    }

    closeModal();
  };

  const renderModalContent = () => {
    if (!modalState.data) {
      return null;
    }

    if (modalState.type === 'details') {
      const item = modalState.data;
      return (
        <div className="space-y-4 text-sm text-ink-900/70">
          <div className="flex items-center gap-3">
            <Avatar name={item.patient} src={patientImages[0]} size={48} />
            <div>
              <p className="font-display text-lg font-bold text-ink-900">{item.patient}</p>
              <p className="text-xs font-semibold text-brand-600">{item.reason}</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-xl border border-sand-200 bg-sand-50 p-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Date</p>
              <p className="mt-1 font-semibold text-ink-900">{item.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Time</p>
              <p className="mt-1 font-semibold text-ink-900">{item.time}</p>
            </div>
            {item.mrn && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">MRN</p>
                <p className="mt-1 font-semibold text-ink-900">{item.mrn}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Status</p>
              <p className="mt-1 font-semibold text-ink-900">{item.status || 'Confirmed'}</p>
            </div>
          </div>
        </div>
      );
    }

    if (modalState.type === 'send-report') {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-ink-900/70">Send a report for {modalState.data.patient}.</p>
          <textarea
            rows={5}
            className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-ink-900 outline-none transition focus:border-brand-400"
            placeholder="Write a summary or report here..."
          />
        </div>
      );
    }

    if (modalState.type === 'success') {
      return (
        <div className="space-y-3 text-sm text-ink-900/70">
          <p><strong>{modalState.title}</strong></p>
          <p>{modalState.data.patient} has been updated successfully.</p>
        </div>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (modalState.type === 'send-report') {
      return (
        <>
          <Button variant="outline" size="sm" onClick={closeModal}>Cancel</Button>
          <Button size="sm" onClick={handleModalAction}>Send Report</Button>
        </>
      );
    }

    return <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>;
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-600"><CalendarCheck size={28} /></span>
          <div><h1 className="font-display text-2xl font-bold text-brand-600">Appointments</h1><p className="text-sm font-semibold text-ink-900/60">View and manage all your appointments.</p></div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value, tone }) => {
            const toneClasses = { brand: 'bg-brand-100 text-brand-600', teal: 'bg-teal-400/20 text-teal-600', amber: 'bg-amber-400/20 text-amber-500', mint: 'bg-mint-400/20 text-mint-500' };
            return <Card key={label} className="p-4 sm:p-5"><div className="flex items-center gap-3"><span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${toneClasses[tone]}`}><Icon size={29} /></span><div><p className="font-display text-2xl font-bold text-ink-900">{value}</p><p className="text-xs font-semibold text-ink-900/55 sm:text-sm">{label}</p></div></div></Card>;
          })}
        </div>

        {sections.filter((section) => !view || section.view === view).map((section) => (
          <AppointmentSection
            key={section.view}
            {...section}
            onViewDetails={(row) => openDetails(row, section.title)}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onSendReports={handleSendReports}
          />
        ))}
      </div>

      <Modal open={modalState.open} onClose={closeModal} title={modalState.title} footer={renderFooter()}>
        {renderModalContent()}
      </Modal>
    </>
  );
}
