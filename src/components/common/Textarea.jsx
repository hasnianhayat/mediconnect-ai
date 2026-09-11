export default function Textarea({ label, required, className = '', containerClassName = '', ...props }) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="field-label">
          {label} {required && <span className="text-coral-500">*</span>}
        </label>
      )}
      <textarea className={`field-input min-h-[120px] resize-y ${className}`} {...props} />
    </div>
  );
}
