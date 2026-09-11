import SearchBar from '../common/SearchBar';
import Select from '../common/Select';

export default function FilterBar({ filters = [], searchPlaceholder = 'Search...', onSearch }) {
  return (
    <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center">
      {filters.map((f) => (
        <Select key={f.label} placeholder={f.label} options={f.options} containerClassName="sm:w-44" />
      ))}
      <SearchBar placeholder={searchPlaceholder} onChange={onSearch} className="sm:ml-auto sm:w-64" />
    </div>
  );
}
