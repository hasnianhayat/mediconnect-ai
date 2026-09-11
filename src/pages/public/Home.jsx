import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, PlayCircle, UserPlus, Stethoscope, Search, CalendarCheck, ShieldCheck, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Button from '../../components/common/Button';
import DoctorFilters from '../../components/doctors/DoctorFilters';
import DoctorGrid from '../../components/doctors/DoctorGrid';
import Avatar from '../../components/common/Avatar';
import { cities, doctors, regions, specialties } from '../../data/doctors';

const steps = [
  { icon: Search, title: 'Search Doctor', desc: 'Select your region, city and category to find the best doctors near you.', tone: 'bg-brand-600 text-white' },
  { icon: CalendarCheck, title: 'Book Appointment', desc: 'View doctor profile and choose your convenient time to book appointment.', tone: 'bg-green-500  text-white' },
  { icon: ShieldCheck, title: 'Get Confirmation', desc: 'Doctor will confirm your appointment and you will get token number.', tone: 'bg-purple-500 text-white' },
];

const testimonials = [
  { name: 'Ayesha', city: 'Karachi', quote: 'Mediconnect AI made it so easy to find the right doctor. The appointment process is smooth and fast!' },
  { name: 'Bilal', city: 'Lahore', quote: 'Very helpful platform! I found a specialist near me within minutes. Highly recommended.' },
  { name: 'Sana', city: 'Islamabad', quote: 'The AI suggestion and doctor verification is amazing. Great experience!' },
];

export default function Home() {
  const navigate = useNavigate();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const availableCities = selectedRegion
    ? [...new Set(doctors.filter((doctor) => doctor.region === selectedRegion).map((doctor) => doctor.city))]
    : cities;

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    setSelectedCity('');
  };

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedCity('');
    setSelectedCategory('');
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

  const visibleTestimonials = testimonials.map((_, index) => (
    testimonials[(testimonialIndex + index) % testimonials.length]
  ));

  return (
    <div>
      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:pt-1  6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <span className="flex  items-center gap-2 text-lg  font-bold text-brand-600 ">
             <span className='p-3 bg-brand-600 text-white rounded-full font-bold '> <Activity size={16} /></span> Your Health, Our Priority
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink-900 sm:text-5xl">
              Smart Healthcare<br /><span className="text-brand-600">Starts Here</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-900/60">
              Mediconnect AI helps you find the right doctors across Pakistan with the power of AI. Easy search, verified doctors and fast appointment booking — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button icon={Stethoscope} onClick={() => navigate('/signup/doctor')}>Join as Doctor</Button>
              <Button variant="outline" icon={UserPlus} onClick={() => navigate('/signup/patient')}>Join as Patient</Button>
              <Button variant="ghost" icon={PlayCircle}>Watch Video</Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:pl-4">
            <div className="relative aspect-[1.25/1] overflow-hidden rounded-3xl ">
              <img
                src="/images/doctor-hero.png"
                alt="Doctor holding a tablet"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
           
           
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#1F5FFF]" />
              <h2 className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[#1f2a44] sm:text-4xl">How It Works</h2>
              <span className="h-[2px] w-8 bg-[#1F5FFF]" />
            </div>
            <p className="mt-3 text-base text-slate-600">Get the best care in just a few simple steps.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="flex items-start gap-4 p-2">
                <span className={`grid h-20 w-20 shrink-0 place-items-center rounded-full shadow-[0_10px_25px_rgba(15,23,42,0.08)] ${s.tone}`}>
                  <s.icon size={34} strokeWidth={2.3} />
                </span>
                <div className="pt-1">
                  <p className="font-display text-[1.05rem] font-bold text-[#1f2a44]">{s.title}</p>
                  <p className="mt-2 text-sm leading-6 text-bold  text-[#1f2a44]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + Top Doctors */}
      <section id="find-doctor" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
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
        <div className="mb-5 mt-9 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 sm:text-xl">Top Doctors</h2>
          <button onClick={() => navigate('/find-doctor')} className="text-sm font-semibold text-brand-600 hover:underline">
            View All Doctors →
          </button>
        </div>
        <DoctorGrid doctors={doctors.slice(0, 8)} />
      </section>

      {/* Testimonials */}
      <section className="border-t border-sand-100 py-14 text-black sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#1F5FFF]" />
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-[#1f2a44] sm:text-3xl">What Our Users Say</h2>
            <span className="h-[2px] w-8 bg-[#1F5FFF]" />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {visibleTestimonials.map((t, index) => (
              <div key={`${t.name}-${index}`} className={`${index > 0 ? 'hidden sm:block' : ''} rounded-xl p-1 sm:p-3`}>
                <div className="mb-3 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-amber-400" />)}
                </div>
                <p className="text-lg leading-relaxed text-[#1f2a44]">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar name={t.name} size={32} />
                  <p className="text-sm font-semibold text-[#1f2a44]">— {t.name}, {t.city}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)}
              className="grid h-9 w-9 place-items-center rounded-full border border-sand-200 text-2xl text-[#1f2a44] hover:bg-sand-100"
            ><ChevronLeft size={16} /></button>

            <span className="flex items-center gap-2.5">
              {testimonials.map((t, index) => (
                <button
                  type="button"
                  key={t.name}
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${index === testimonialIndex ? 'bg-[#1F5FFF]' : 'bg-[#cfd8ff]'}`}
                />
              ))}
            </span>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}
              className="grid h-9 w-9 place-items-center rounded-full border border-sand-200 text-2xl text-[#1f2a44] hover:bg-sand-100"
            ><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}
