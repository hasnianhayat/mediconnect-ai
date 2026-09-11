import { ChevronDown } from 'lucide-react';

export default function Input({ label, icon: Icon, suffix, unitOptions, unitValue, onUnitChange, required, className = '', containerClassName = '', hint, ...props }) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="field-label">
          {label} {required && <span className="text-coral-500">*</span>}
        </label>
      )}
      <div className={`field-shell relative ${Icon ? 'field-shell-with-icon' : ''}`}>
        {Icon && (
          <div className="field-icon-wrap">
            <Icon size={16} strokeWidth={2} className="field-icon" />
          </div>
        )}
        {Icon && <div className="field-divider" />}
        <input className={`field-input ${suffix || unitOptions ? 'pr-20' : ''} ${className}`} {...props} />
        {unitOptions ? (
          <div className="absolute right-2 flex items-center">
            <select value={unitValue} onChange={onUnitChange} aria-label={`${label} unit`} className="appearance-none bg-transparent py-2 pl-2 pr-5 text-xs font-bold text-ink-900 outline-none">
              {unitOptions.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-1 text-ink-900/70" />
          </div>
        ) : suffix && <span className="pointer-events-none absolute right-4 text-xs font-bold text-ink-900/60">{suffix}</span>}
      </div>
      {hint && <p className="mt-1 text-xs text-ink-900/45">{hint}</p>}
    </div>
  );
}
