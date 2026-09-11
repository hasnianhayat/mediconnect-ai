const STATUS_MAP = {
  active: { tone: 'text-mint-500', label: 'Active' },
  completed: { tone: 'text-mint-500', label: 'Completed' },
  approved: { tone: 'text-mint-500', label: 'Approved' },
  pending: { tone: 'text-amber-500', label: 'Pending' },
  'pending queue': { tone: 'text-amber-500', label: 'Pending Queue' },
  cancelled: { tone: 'text-coral-500', label: 'Cancelled' },
  blocked: { tone: 'text-coral-500', label: 'Blocked' },
  reviewed: { tone: 'text-mint-500', label: 'Reviewed' },
  'under review': { tone: 'text-amber-500', label: 'Under Review' },
};

export default function StatusBadge({ status, className = '' }) {
  const key = String(status).toLowerCase();
  const cfg = STATUS_MAP[key] || { tone: 'text-ink-900/60', label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${cfg.tone} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {cfg.label}
    </span>
  );
}
