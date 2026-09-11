import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-pop">
        <div className="flex items-center justify-between border-b border-sand-200 px-6 py-4">
          <h3 className="font-display text-lg font-semibold text-ink-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-ink-900/50 hover:bg-sand-100">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-sand-200 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
