import Avatar from '../common/Avatar';
import AppointmentStatus from './AppointmentStatus';
import Button from '../common/Button';

export default function AppointmentTable({ rows = [], showActions = true }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
            <th className="py-3 pr-4">Patient</th>
            <th className="py-3 pr-4">Date & Time</th>
            <th className="py-3 pr-4">Reason</th>
            <th className="py-3 pr-4">Status</th>
            {showActions && <th className="py-3 pr-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-sand-100 last:border-0">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <Avatar name={r.patient} size={36} />
                  <div>
                    <p className="font-semibold text-ink-900">{r.patient}</p>
                    <p className="text-xs text-ink-900/40">{r.mrn}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-ink-900/70">{r.date} · {r.time}</td>
              <td className="py-3 pr-4 text-ink-900/70">{r.reason}</td>
              <td className="py-3 pr-4"><AppointmentStatus status={r.status} /></td>
              {showActions && (
                <td className="py-3 pr-4 text-right">
                  {r.status === 'Pending' ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="mint">Accept</Button>
                      <Button size="sm" variant="danger">Decline</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline">View Details</Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
