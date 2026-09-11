const TONES = {
  brand: 'bg-brand-100 text-brand-600',
  mint: 'bg-mint-400/15 text-mint-500',
  amber: 'bg-amber-400/15 text-amber-500',
  coral: 'bg-coral-400/15 text-coral-500',
  teal: 'bg-teal-400/15 text-teal-600',
};

export default function StatCard({ icon: Icon, label, value, trend, tone = 'brand' }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${TONES[tone]}`}>
          <Icon size={20} />
        </span>
        {trend && (
          <span className={`text-xs font-semibold ${trend.startsWith('-') ? 'text-coral-500' : 'text-mint-500'}`}>
            {trend} vs last month
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-ink-900">{value}</p>
      <p className="text-sm text-ink-900/50">{label}</p>
    </div>
  );
}
