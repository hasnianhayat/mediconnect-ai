export default function AdminStatCard({ icon: Icon, label, value, trend, tone = 'text-brand-600 bg-brand-100' }) {
  return (
    <div className="card min-w-0 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
          <Icon size={25} strokeWidth={2.2} />
        </span>
        {trend && (
          <span className={`text-xs font-semibold ${trend.startsWith('-') ? 'text-coral-500' : 'text-mint-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold leading-none text-ink-900 sm:text-3xl">{value}</p>
      <p className="mt-2 truncate text-xs font-semibold text-ink-900/55 sm:text-sm">{label}</p>
      {trend && <p className="mt-0.5 text-xs text-ink-900/35">vs last month</p>}
    </div>
  );
}
