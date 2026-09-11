export default function SuggestionCard({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-md border border-[#E2EAF2] bg-white px-2.5 py-1.5 text-[9px] font-semibold text-ink-900/70 transition-colors hover:border-brand-300 hover:text-brand-600 sm:text-[10px]"
    >
      {Icon && <Icon size={13} className="text-brand-700" />}
      {label}
    </button>
  );
}
