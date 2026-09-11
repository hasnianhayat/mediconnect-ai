import { MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import DoctorRating from './DoctorRating';
import Button from '../common/Button';

const DOCTOR_IMAGES = [
  '/images/doctor3.png',
  '/images/doctor4.png',
  '/images/doctor5.png',
  '/images/doctor6.png',
  '/images/image.png',
  '/images/doctor-login.png',
];

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  const location = useLocation();
  const patientPrefix = location.pathname.startsWith('/patient') ? '/patient' : '';
  const doctorImage = doctor.image || DOCTOR_IMAGES[(Number(doctor.id) || 0) % DOCTOR_IMAGES.length];

  return (
    <div className="card flex min-w-0 flex-col gap-3 p-3 sm:p-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={doctorImage}
          alt={doctor.name}
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm sm:h-14 sm:w-14"
        />
        <div className="min-w-0 flex-1 text-left">
          <button
            onClick={() => navigate(`${patientPrefix}/doctor-profile/${doctor.id}`)}
            className="text-left w-full truncate font-display text-xs font-bold text-ink-900 hover:text-brand-600 sm:text-sm"
            title={doctor.name}
          >
            {doctor.name}
          </button>
          <p className="mt-1 truncate text-[11px] font-semibold text-ink-900/65 sm:text-xs">{doctor.specialty}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="flex min-w-0 items-center gap-1 truncate text-[10px] text-ink-900/55 sm:text-xs">
              <MapPin size={11} className="shrink-0" /> {doctor.city}
            </p>
            <DoctorRating rating={doctor.rating} size={11} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <Button
          variant="outline"
          size="sm"
          className="min-w-0 !px-1.5 !py-2 !text-[9px] sm:!px-2 sm:!text-[10px]"
          onClick={() => navigate(`${patientPrefix}/doctor-profile/${doctor.id}`)}
        >
          View Profile
        </Button>
        <Button
          size="sm"
          className="min-w-0 !px-1.5 !py-2 !text-[9px] sm:!px-2 sm:!text-[10px]"
          onClick={() => navigate(`${patientPrefix}/book-appointment/${doctor.id}`)}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
