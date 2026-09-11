import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TONES = {
  brand: 'bg-brand-100 text-brand-600',
  mint: 'bg-mint-400/15 text-mint-500',
  teal: 'bg-teal-400/15 text-teal-600',
};

export default function QuickAction({ icon: Image, title, description, actionLabel, to, tone = 'brand' }) {
  const navigate = useNavigate();
  return (
    <div className="card !border-0 !shadow-none flex flex-col gap-2.5 p-4">
      <span className={`grid h-9 w-9 place-items-center rounded-lg ${TONES[tone]}`}>
        <img src={Image} alt="" />
      </span>
      <div>
        <p className="font-display text-sm font-semibold text-ink-900">{title}</p>
        <p className="mt-1 text-xs font-bold leading-5 text-ink-900">{description}</p>
      </div>
      <button onClick={() => navigate(to)} className="mt-auto flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 transition-all">
        {actionLabel} <ArrowRight size={14} />
      </button>
    </div>
  );
}
