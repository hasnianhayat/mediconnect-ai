import { ChevronDown } from 'lucide-react';

export default function Select({ label, icon: Icon, required, options = [], placeholder, className = '', containerClassName = '', ...props }) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="field-label">
          {label} {required && <span className="text-coral-500">*</span>}
        </label>
      )}
      <div className="field-shell relative">
        {Icon && (
          <span className="field-icon-wrap">
            <Icon size={16} strokeWidth={2} />
          </span>
        )}
        <select
          className={`field-input appearance-none pr-9 ${Icon ? 'pl-0' : ''} ${!props.value && !props.defaultValue ? 'text-ink-900/40' : ''} ${className}`}
          defaultValue=""
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-700" />
      </div>
    </div>
  );
}
