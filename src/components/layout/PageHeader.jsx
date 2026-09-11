export default function PageHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600 sm:h-16 sm:w-16">
            <Icon size={30} strokeWidth={2.1} />
          </span>
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 max-w-xl text-xs font-bold leading-5 text-ink-900 sm:text-sm">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
