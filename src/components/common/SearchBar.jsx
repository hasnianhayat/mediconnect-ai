import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search...', className = '', ...props }) {
  return (
    <div className={`field-icon-wrap ${className}`}>
      <span className="field-icon">
        <Search size={16} />
      </span>
      <input type="text" placeholder={placeholder} className="field-input-icon" {...props} />
    </div>
  );
}
