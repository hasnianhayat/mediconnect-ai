export default function ActivityList({ items = [] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
            <item.icon size={15} />
          </span>
          <div className="flex-1">
            <p className="text-sm text-ink-900">
              <span className="font-semibold">{item.actor}</span> {item.action}
            </p>
            <p className="text-xs text-ink-900/40">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
