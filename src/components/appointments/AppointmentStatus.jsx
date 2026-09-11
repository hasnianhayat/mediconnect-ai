export default function AppointmentStatus({ status }) {
  const map = {
    Completed: 'chip-active',
    Confirmed: 'chip-active',
    Pending: 'chip-pending',
    Cancelled: 'chip-cancelled',
  };
  return <span className={map[status] || 'chip-info'}>{status}</span>;
}
