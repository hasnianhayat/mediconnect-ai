import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import DoctorFilters from '../../components/doctors/DoctorFilters';
import DoctorGrid from '../../components/doctors/DoctorGrid';
import { cities, doctors, regions, specialties } from '../../data/doctors';

export default function FindDoctor() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialFilters = location.state?.filters || {};
  const [selectedRegion, setSelectedRegion] = useState(initialFilters.region || '');
  const [selectedCity, setSelectedCity] = useState(initialFilters.city || '');
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');

  const availableCities = useMemo(() => {
    if (!selectedRegion) return cities;

    const citiesInRegion = doctors
      .filter((doctor) => doctor.region === selectedRegion)
      .map((doctor) => doctor.city);

    return citiesInRegion.length ? [...new Set(citiesInRegion)] : cities;
  }, [selectedRegion]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesRegion = !selectedRegion || doctor.region === selectedRegion;
      const matchesCity = !selectedCity || doctor.city === selectedCity;
      const matchesCategory = !selectedCategory || doctor.specialty === selectedCategory;

      return matchesRegion && matchesCity && matchesCategory;
    });
  }, [selectedRegion, selectedCity, selectedCategory]);

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    setSelectedCity('');
  };

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedCity('');
    setSelectedCategory('');
    navigate('/find-doctor', { replace: true, state: {} });
  };

  const handleSearch = () => {
    navigate('/find-doctor', {
      state: {
        filters: {
          region: selectedRegion,
          city: selectedCity,
          category: selectedCategory,
        },
      },
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Search size={20} strokeWidth={2.3} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-700 sm:text-4xl">Find Doctor</h1>
          <p className="mt-1 text-sm text-ink-900/60">Find and connect with trusted doctors near you.</p>
        </div>
      </div>

      <DoctorFilters
        selectedRegion={selectedRegion}
        selectedCity={selectedCity}
        selectedCategory={selectedCategory}
        availableRegions={regions}
        availableCities={availableCities}
        availableCategories={specialties}
        onRegionChange={handleRegionChange}
        onCityChange={setSelectedCity}
        onCategoryChange={setSelectedCategory}
        onClearFilters={clearFilters}
        onSearch={handleSearch}
        showSearchButton
      />

      <div className="mt-8">
        <DoctorGrid doctors={filteredDoctors} onClearFilters={clearFilters} />
      </div>
    </div>
  );
}
