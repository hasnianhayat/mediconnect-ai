import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AtSign,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  Camera,
  FileText,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  MessageSquare,
  Play,
  Share2,
  Star,
  Stethoscope,
  WalletCards,
} from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { doctors, featuredDoctor } from '../../data/doctors';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = { ...featuredDoctor, ...doctors.find((d) => String(d.id) === id) };

  return (
    <div className="mx-auto w-full max-w-5xl pb-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-bold text-ink-900/60 transition hover:text-brand-600">
        <ArrowLeft size={16} /> Back to Doctors
        </button>
        <Button variant="ghost" size="sm" icon={Share2} className="shrink-0">Share Profile</Button>
      </div>

      <article className="card overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between lg:gap-10">
            <div className="flex min-w-0 items-center gap-5 sm:gap-7 lg:gap-8">
              <Avatar name={doctor.name} src={doctor.image} size={112} className="shrink-0 ring-4 ring-brand-50 sm:h-32 sm:w-32 lg:h-36 lg:w-36" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{doctor.name}</h1>
                  <BadgeCheck size={22} className="shrink-0 fill-brand-50 text-brand-600" />
                </div>
                <p className="mt-1 text-base font-bold text-brand-600 sm:text-lg">{doctor.specialty}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-ink-900/65">
                  <span className="flex items-center gap-1.5 text-amber-500">
                    <span className="flex items-center gap-0.5" aria-label={`${doctor.rating} out of 5 stars`}>
                      {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={18} className={star < Math.round(doctor.rating) ? 'fill-amber-400 text-amber-400' : 'fill-sand-200 text-sand-200'} />)}
                    </span>
                    <span className="ml-1 font-bold text-ink-900">{doctor.rating} ({doctor.reviews} Reviews)</span>
                  </span>
                  <span className="flex items-center gap-1.5"><MapPin size={20} strokeWidth={2.2} className="text-brand-600" /> {doctor.city}, {doctor.region}</span>
                </div>
              </div>
            </div>
          </div>

          <SectionTitle>About</SectionTitle>
          <p className="max-w-3xl text-xs leading-6 text-ink-900/65 sm:text-sm">{doctor.bio}</p>

          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-sand-200 pt-7 sm:grid-cols-2">
            <Info icon={BriefcaseBusiness} label="Experience" value={doctor.experience} />
            <Info icon={WalletCards} label="Consultation Fees" value={`PKR ${doctor.fee}`} />
            <Info icon={GraduationCap} label="Qualification" value={doctor.qualification} />
            <Info icon={Stethoscope} label="Specialization" value={doctor.specialization || doctor.specialty} />
            <Info icon={MapPin} label="Region" value={doctor.region} />
            <Info icon={Building2} label="City" value={doctor.city} />
          </div>

          <div className="mt-8 grid gap-8 border-t border-sand-200 pt-7">
            <Info icon={Building2} label="Hospital Address" value={doctor.hospital || `${doctor.city}, ${doctor.region}, Pakistan`} />
            <Info icon={Mail} label="Email" value={doctor.email || 'Contact through Mediconnect AI'} />
          </div>

          <div className="mt-8 border-t border-sand-200 pt-7">
            <div className="flex items-start gap-5">
              <Link2 size={22} strokeWidth={2.1} className="mt-1 shrink-0 text-brand-600" />
              <div>
                <p className="mb-3 text-xs font-extrabold text-brand-700 sm:text-sm">Social Links</p>
                <div className="flex items-center gap-5">
              {[AtSign, Link2, BriefcaseBusiness, Camera, Play].map((Icon, i) => (
                <a href="#" key={i} aria-label="Doctor social link" className="grid h-7 w-7 place-items-center text-brand-600 transition hover:text-brand-800"><Icon size={19} strokeWidth={2.2} /></a>
              ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-start gap-5 border-t border-sand-200 pt-7">
            <FileText size={22} strokeWidth={2.1} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-xs font-extrabold text-brand-700 sm:text-sm">Note</p>
              <p className="mt-1 text-xs font-semibold text-ink-900/70 sm:text-sm">Available for consultation from {doctor.availability || 'Monday to Saturday, 10:00 AM to 06:00 PM'}.</p>
            </div>
          </div>

          <section className="mt-7 border-t border-sand-200 pt-7" aria-labelledby="feedback-heading">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p id="feedback-heading" className="flex items-center gap-2 text-xs font-extrabold text-brand-700 sm:text-sm">
                  <MessageSquare size={17} className="text-brand-600" /> Patient Feedback
                </p>
                <p className="mt-1 text-xs text-ink-900/55 sm:text-sm">See what other patients shared about their appointments.</p>
              </div>
              <button type="button" onClick={() => navigate(`/patient/doctor-profile/${doctor.id}/feedback`)} className="text-xs font-bold text-brand-600 hover:underline">View all reviews</button>
            </div>
            <div className="mt-4 rounded-xl border border-sand-200 bg-sand-50 p-4">
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((value) => <Star key={value} size={15} className="fill-amber-400 text-amber-400" />)}
                <span className="ml-1 text-xs font-bold text-ink-900">5.0</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-ink-900/65 sm:text-sm">“Dr. Ali listened carefully and explained my treatment clearly.”</p>
            </div>
            <Button variant="secondary" icon={Star} onClick={() => navigate(`/patient/doctor-profile/${doctor.id}/feedback?add=1`)} className="mt-3 w-full sm:w-auto">Add Comment</Button>
          </section>

          <div className="mt-7 grid grid-cols-1 gap-3 border-t border-sand-200 pt-6 sm:grid-cols-3">
            <Button variant="outline" icon={MessageSquare} onClick={() => navigate(`/patient/doctor-profile/${doctor.id}/feedback`)} className="h-11 w-full">View Feedback</Button>
            <Button variant="secondary" icon={Star} onClick={() => navigate(`/patient/doctor-profile/${doctor.id}/feedback?add=1`)} className="h-11 w-full">Add Feedback</Button>
            <Button icon={CalendarCheck} onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)} className="h-11 w-full">Book Appointment</Button>
          </div>
        </div>
      </article>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="mb-2 mt-6 text-xs font-extrabold uppercase tracking-wide text-brand-600">{children}</h2>;
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-4">
      <Icon size={23} strokeWidth={2.1} className="mt-0.5 shrink-0 text-brand-600" />
      <div className="min-w-0">
        <p className="text-xs font-extrabold text-brand-700 sm:text-sm">{label}</p>
        <p className="mt-1 break-words text-xs font-semibold leading-5 text-ink-900 sm:text-sm">{value}</p>
      </div>
    </div>
  );
}
