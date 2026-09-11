export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand-200 bg-sand-50 px-6 py-12 text-center">
      {Icon && (
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-600">
          <Icon size={26} />
        </div>
      )}
      <p className="font-display text-base font-semibold text-ink-900">{title}</p>
      {description && <p className="mt-1.5 max-w-xs text-sm text-ink-900/55">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
