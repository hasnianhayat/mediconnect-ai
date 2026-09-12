import { useState } from 'react';
import { CalendarCheck, ChevronRight, History, Hourglass } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import AppointmentCard from '../../components/appointments/AppointmentCard';
import AppointmentDetails from '../../components/appointments/AppointmentDetails';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { patientAppointments } from '../../data/doctors';

const normalizeAppointments = (source) => ({
  upcoming: source.upcoming.map((item, index) => ({ ...item, id: `upcoming-${index}` })),
  pending: source.pending.map((item, index) => ({ ...item, id: `pending-${index}` })),
  history: source.history.map((item, index) => ({ ...item, id: `history-${index}` })),
});

const rescheduleOptions = [
  { date: '27 May 2026', time: '09:00 AM' },
  { date: '27 May 2026', time: '03:30 PM' },
  { date: '28 May 2026', time: '10:15 AM' },
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(() => normalizeAppointments(patientAppointments));
  const [modalState, setModalState] = useState({
    open: false,
    type: 'details',
    title: '',
    items: [],
    selected: null,
    reportText: '',
  });

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, open: false }));
  };

  const openListModal = (title, items) => {
    setModalState({ open: true, type: 'list', title, items, selected: null, reportText: '' });
  };

  const openDetails = (appt) => {
    setModalState({ open: true, type: 'details', title: 'Appointment Details', items: [], selected: appt, reportText: '' });
  };

  const openReschedule = (appt) => {
    setModalState({ open: true, type: 'reschedule', title: 'Reschedule Appointment', items: [], selected: appt, reportText: '' });
  };

  const openCancel = (appt) => {
    setModalState({ open: true, type: 'cancel', title: 'Cancel Appointment', items: [], selected: appt, reportText: '' });
  };

  const openReport = (appt) => {
    setModalState({ open: true, type: 'report', title: 'Send Report', items: [], selected: appt, reportText: '' });
  };

  const updateAppointment = (matchId, updates) => {
    setAppointments((prev) => {
      const next = { ...prev };

      Object.keys(next).forEach((key) => {
        next[key] = next[key].map((item) => (item.id === matchId ? { ...item, ...updates } : item));
      });

      return next;
    });
  };

  const removeAppointment = (appt) => {
    setAppointments((prev) => {
      const next = { ...prev };

      Object.keys(next).forEach((key) => {
        next[key] = next[key].filter((item) => item.id !== appt.id);
      });

      return next;
    });

    closeModal();
  };

  const submitReport = () => {
    closeModal();
  };

  const modalFooter = (() => {
    if (modalState.type === 'cancel') {
      return (
        <>
          <Button variant="outline" size="sm" onClick={closeModal}>Keep Appointment</Button>
          <Button variant="danger" size="sm" onClick={() => removeAppointment(modalState.selected)}>Cancel Appointment</Button>
        </>
      );
    }

    if (modalState.type === 'report') {
      return (
        <>
          <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>
          <Button size="sm" onClick={submitReport}>Send Report</Button>
        </>
      );
    }

    return (
      <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>
    );
  })();

  const renderModalContent = () => {
    if (modalState.type === 'list') {
      return (
        <div className="space-y-3">
          {modalState.items.length === 0 ? (
            <p className="text-sm font-medium text-ink-900/60">No appointments available in this section.</p>
          ) : (
            modalState.items.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-sand-200 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-sm font-bold text-brand-700">{item.doctor}</p>
                  <p className="mt-1 text-xs font-semibold text-ink-900/60">{item.specialty}</p>
                  <p className="mt-1 text-xs font-semibold text-ink-900/60">{item.date} · {item.time}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => openDetails(item)}>View Details</Button>
              </div>
            ))
          )}
        </div>
      );
    }

    if (modalState.type === 'reschedule') {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-ink-900/70">Choose a new available time for this appointment:</p>
          {rescheduleOptions.map((option) => (
            <button
              key={`${option.date}-${option.time}`}
              type="button"
              onClick={() => {
                updateAppointment(modalState.selected.id, { date: option.date, time: option.time });
                closeModal();
              }}
              className="flex w-full items-center justify-between rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 text-left transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <span className="text-sm font-bold text-ink-900">{option.date}</span>
              <span className="text-sm font-semibold text-brand-700">{option.time}</span>
            </button>
          ))}
        </div>
      );
    }

    if (modalState.type === 'cancel') {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-ink-900/70">
            Are you sure you want to cancel your appointment with {modalState.selected?.doctor}?
          </p>
        </div>
      );
    }

    if (modalState.type === 'report') {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-ink-900/70">Share a short report for this appointment.</p>
          <textarea
            value={modalState.reportText}
            onChange={(event) => setModalState((prev) => ({ ...prev, reportText: event.target.value }))}
            rows={5}
            placeholder="Write your report here..."
            className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-ink-900 outline-none transition focus:border-brand-400"
          />
        </div>
      );
    }

    return modalState.selected ? <AppointmentDetails appt={modalState.selected} /> : null;
  };

  return (
    <>
      <div>
        <PageHeader icon={CalendarCheck} title="My Appointments" subtitle="Manage your appointments easily in one place" />

        <Section
          title="Upcoming Appointments"
          count={appointments.upcoming.length}
          icon={CalendarCheck}
          tone="brand"
          action="View All Upcoming Appointments"
          items={appointments.upcoming}
          onAction={openListModal}
        >
          {appointments.upcoming.map((a) => (
            <AppointmentCard
              key={a.id}
              appt={a}
              variant="upcoming"
              onViewDetails={openDetails}
              onReschedule={openReschedule}
              onCancel={openCancel}
              onSendReport={openReport}
            />
          ))}
        </Section>

        <Section
          title="Pending Appointments"
          count={appointments.pending.length}
          icon={Hourglass}
          tone="amber"
          action="View All Pending Appointments"
          items={appointments.pending}
          onAction={openListModal}
        >
          {appointments.pending.map((a) => (
            <AppointmentCard
              key={a.id}
              appt={a}
              variant="pending"
              onViewDetails={openDetails}
            />
          ))}
        </Section>

        <Section
          title="Appointment History"
          count={appointments.history.length}
          icon={History}
          tone="mint"
          action="View All History"
          items={appointments.history}
          onAction={openListModal}
        >
          {appointments.history.map((a) => (
            <AppointmentCard
              key={a.id}
              appt={a}
              variant="history"
              onViewDetails={openDetails}
            />
          ))}
        </Section>
      </div>

      <Modal
        open={modalState.open}
        onClose={closeModal}
        title={modalState.title}
        footer={modalFooter}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
}

function Section({ title, count, icon: Icon, tone, action, items, onAction, children }) {
  const tones = {
    brand: 'text-brand-700 bg-brand-50',
    amber: 'text-amber-500 bg-amber-50',
    mint: 'text-mint-500 bg-mint-50',
  };

  return (
    <section className="card mb-4 !border-0 !shadow-none p-4 sm:p-5">
      <div className="mb-3 flex flex-col gap-2 pb-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className={`grid h-6 w-6 place-items-center rounded-md ${tones[tone]}`}><Icon size={14} /></span>
          <h3 className="font-display text-xs font-bold text-ink-900">{title}</h3>
        </div>
        <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold ${tones[tone]} sm:ml-auto`}>{count}</span>
      </div>

      <div className="space-y-2.5">{children}</div>

      <button
        type="button"
        onClick={() => onAction(title, items)}
        className={`mt-3 flex w-full items-center justify-end gap-1 text-[10px] font-semibold ${tones[tone].split(' ')[0]} hover:underline sm:w-auto`}
      >
        {action} <ChevronRight size={13} />
      </button>
    </section>
  );
}
