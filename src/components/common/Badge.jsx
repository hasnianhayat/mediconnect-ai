const TONES = {
  brand: 'bg-brand-100 text-brand-700',
  mint: 'bg-mint-400/15 text-mint-500',
  amber: 'bg-amber-400/15 text-amber-500',
  coral: 'bg-coral-400/15 text-coral-500',
  slate: 'bg-sand-200 text-ink-900/70',
  teal: 'bg-teal-400/15 text-teal-600',
};

export default function Badge({ tone = 'brand', icon: Icon, className = '', children }) {
  return (
    <span className={`chip ${TONES[tone]} ${className}`}>
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      {children}
    </span>
  );
}
