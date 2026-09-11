import { Link } from 'react-router-dom';
import { Cross } from 'lucide-react';

export default function Logo({ dark = false, to = '/' }) {
  return (
    <Link to={to} aria-label="Mediconnect AI home" className="flex shrink-0 items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-500 text-white shadow-pop">
        <Cross size={23} strokeWidth={3.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.15rem] font-bold tracking-[-0.03em] ${dark ? 'text-white' : 'text-ink-900'}`}>
          Mediconnect <span className="text-teal-500">AI</span>
        </span>
        <span className={`mt-1 text-[0.65rem] font-bold tracking-[0.03em] ${dark ? 'text-white/75' : 'text-ink-900/75'}`}>
          AI Assistant
        </span>
      </span>
    </Link>
  );
}
