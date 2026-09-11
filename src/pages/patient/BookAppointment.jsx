import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Video,
  WalletCards,
} from 'lucide-react';

import Avatar from '../../components/common/Avatar';
import TimeSlotPicker, { APPOINTMENT_DURATION_MINUTES } from '../../components/appointments/TimeSlotPicker';
import AppointmentForm from '../../components/appointments/AppointmentForm';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { doctors, featuredDoctor } from '../../data/doctors';

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booked, setBooked] = useState(false);
  const [date, setDate] = useState('Sat, May 25');
  const [mode, setMode] = useState('In-person');
  const [time, setTime] = useState('11:20 AM');

  const doctor = {
    ...featuredDoctor,
    ...doctors.find((d) => String(d.id) === id),
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-sand-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <Card className="border-mint-400/20 bg-white p-6 text-center shadow-sm sm:p-8">
            <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-mint-400/15 text-mint-500">
              <CalendarCheck size={30} />
            </span>

            <h2 className="font-display text-2xl font-bold text-ink-900">
              Appointment Booked!
            </h2>

            <p className="mt-2 text-sm leading-6 text-ink-900/55">
              Your appointment has been successfully booked with{' '}
              <span className="font-semibold text-ink-900">
                {doctor.name}
              </span>
              .
            </p>

            <div className="mt-5 rounded-xl border border-sand-200 bg-sand-50 p-4 text-left">
              <SummaryRow
                icon={Calendar}
                label="Date"
                value={date}
              />

              <SummaryRow
                icon={Clock3}
                label="Time"
                value={time}
              />

              <SummaryRow icon={Clock3} label="Duration" value={`${APPOINTMENT_DURATION_MINUTES} minutes`} />

              <SummaryRow
                icon={Video}
                label="Type"
                value={mode}
              />

              <SummaryRow
                icon={MapPin}
                label="Location"
                value={`${doctor.city}, ${doctor.region}`}
              />
            </div>

            <p className="mt-4 text-xs font-semibold text-brand-600">
              Token #DR-250524-1120
            </p>

            <Button
              className="mt-6 w-full"
              onClick={() => navigate('/patient/appointments')}
            >
              Go to My Appointments
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-3 flex items-center gap-1.5 text-[11px] font-bold text-ink-900/55 transition hover:text-brand-600 sm:text-xs"
        >
          <ArrowLeft size={15} />
          Back to Doctors
        </button>

        {/* Page Heading */}
        <div className="mb-5">
          <h1 className="font-display text-xl font-bold text-brand-600 sm:text-2xl lg:text-[26px]">
            Book Appointment
          </h1>

          <p className="mt-1 max-w-2xl text-[11px] leading-5 text-ink-900/ font-bold sm:text-xs">
            Choose a convenient time and share a few details to confirm your
            appointment.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid items-start gap-4 lg:gap-5 xl:grid-cols-[220px_minmax(0,1fr)_235px]">

          {/* =====================================================
              LEFT - DOCTOR INFORMATION
          ====================================================== */}
          <aside className="xl:sticky xl:top-5">
            <Card className="p-4 sm:p-5">

              {/* Doctor */}
              <div className="flex items-center gap-3 xl:block">
                <Avatar
                  name={doctor.name}
                  src={doctor.image}
                  size={64}
                  className="shrink-0"
                />

                <div className="xl:mt-3">
                  <div className="flex items-center gap-1">
                    <h2 className="font-display text-sm font-bold text-ink-900 sm:text-base">
                      {doctor.name}
                    </h2>

                    <BadgeCheck
                      size={14}
                      className="shrink-0 text-brand-600"
                    />
                  </div>

                  <p className="mt-0.5 text-[11px] font-bold text-brand-600">
                    {doctor.specialty}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-[10px] text-ink-900/50">
                    <MapPin size={11} />
                    {doctor.city}, {doctor.region}
                  </p>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-sand-200 pt-4">

                <MiniStat
                  icon={BriefcaseIcon}
                  label="Experience"
                  value={doctor.experience}
                />

                <MiniStat
                  icon={Stethoscope}
                  label="Qualification"
                  value={doctor.qualification}
                />

                <MiniStat
                  icon={WalletCards}
                  label="Consultation Fee"
                  value={`PKR ${doctor.fee}`}
                />

              </div>

            </Card>
          </aside>

          {/* =====================================================
              CENTER - BOOKING FORM
          ====================================================== */}
          <main className="min-w-0 space-y-4">

            {/* STEP 1 */}
            <Card className="p-4 sm:p-5">

              <StepTitle
                number="1"
                title="Select Date & Time"
                icon={Calendar}
              />

              <p className="mt-1 ml-9 text-[10px] text-ink-900/45">
                Select your preferred appointment date and available time.
              </p>

              <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">

                {/* Calendar */}
                <div className="rounded-xl border border-sand-200 bg-white p-3 sm:p-4">
                  <CalendarPicker
                    value={date}
                    onChange={setDate}
                  />
                </div>

                {/* Time Slots */}
                <div className="rounded-xl border border-sand-200 bg-white p-3 sm:p-4">

                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-ink-900">
                        Available Slots
                      </p>

                      <p className="mt-0.5 text-[10px] text-ink-900/45">
                        Choose a suitable time
                      </p>
                    </div>

                    <span className="rounded-md bg-brand-50 px-2 py-1 text-[9px] font-bold text-brand-600">
                      {APPOINTMENT_DURATION_MINUTES} min
                    </span>
                  </div>

                  <TimeSlotPicker
                    onSelect={setTime}
                  />

                </div>
              </div>
            </Card>

            {/* STEP 2 */}
            <Card className="p-4 sm:p-5">

              <StepTitle
                number="2"
                title="Appointment Type"
                icon={Video}
              />

              <p className="mt-1 ml-9 text-[10px] text-ink-900/45">
                Select how you would like to consult the doctor.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* In-person */}
                <AppointmentTypeButton
                  selected={mode === 'In-person'}
                  icon={Stethoscope}
                  title="In-person"
                  description="Visit the clinic"
                  onClick={() => setMode('In-person')}
                />

                {/* Video */}
                <AppointmentTypeButton
                  selected={mode === 'Video Consultation'}
                  icon={Video}
                  title="Video Consultation"
                  description="Meet securely online"
                  onClick={() => setMode('Video Consultation')}
                />

              </div>
            </Card>

            {/* STEP 3 */}
            <Card className="p-4 sm:p-5">

              <StepTitle
                number="3"
                title="Patient Information"
                icon={Stethoscope}
              />

              <p className="mt-1 ml-9 text-[10px] text-ink-900/45">
                Enter your information to complete the appointment.
              </p>

              <div className="mt-4">
                <AppointmentForm />
              </div>

            </Card>

          </main>

          {/* =====================================================
              RIGHT - APPOINTMENT SUMMARY
          ====================================================== */}
          <aside className="space-y-4 xl:sticky xl:top-5">

            <Card className="border-brand-100 bg-brand-50/40 p-4 sm:p-5">

              {/* Heading */}
              <div>
                <h3 className="font-display text-sm font-bold text-ink-900 sm:text-base">
                  Appointment Summary
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-ink-900/45">
                  Review your appointment details before booking.
                </p>
              </div>

              {/* Summary Rows */}
              <div className="mt-4 space-y-3">

                <SummaryRow
                  icon={Calendar}
                  label="Date"
                  value={date}
                />

                <SummaryRow
                  icon={Clock3}
                  label="Time"
                  value={time}
                />

                <SummaryRow icon={Clock3} label="Duration" value={`${APPOINTMENT_DURATION_MINUTES} minutes`} />

                <SummaryRow
                  icon={Video}
                  label="Type"
                  value={mode}
                />

                <SummaryRow
                  icon={MapPin}
                  label="Location"
                  value={`${doctor.city}, ${doctor.region}`}
                />

              </div>

              {/* QR */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-3">

                <QrCode />

                <div className="min-w-0">
                  <p className="text-[9px] font-extrabold uppercase tracking-wide text-brand-700">
                    Appointment QR
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-ink-900/50">
                    Scan to save your booking details.
                  </p>

                  <p className="mt-1 text-[9px] font-bold text-ink-900">
                    #DR-250524-1120
                  </p>
                </div>

              </div>

              {/* Divider */}
              <div className="my-4 border-t border-brand-100" />

              {/* Fee */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-ink-900/65">
                  Consultation Fee
                </span>

                <span className="text-sm font-extrabold text-ink-900">
                  PKR {doctor.fee}
                </span>
              </div>

              {/* Book Button */}
              <Button
                className="mt-5 w-full"
                icon={CalendarCheck}
                onClick={() => setBooked(true)}
              >
                Book Appointment
              </Button>

              {/* Security */}
              <p className="mt-3 flex items-center justify-center gap-1 text-[9px] text-ink-900/45">
                <ShieldCheck
                  size={12}
                  className="text-mint-500"
                />
                Your information is secure
              </p>

            </Card>

            {/* Easy Booking */}
            <div className="hidden rounded-xl border border-mint-400/20 bg-mint-400/10 p-4 sm:block">

              <p className="flex items-center gap-2 text-xs font-bold text-mint-500">
                <CheckCircle2 size={14} />
                Easy appointment booking
              </p>

              <p className="mt-2 text-[10px] leading-5 text-ink-900/60">
                You can reschedule or cancel your appointment from your
                dashboard.
              </p>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}


/* ================================================================
   STEP TITLE
================================================================ */

function StepTitle({ number, title, icon: Icon }) {
  return (
    <div className="flex items-center gap-2.5">

      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white shadow-sm">
        {number}
      </span>

      <Icon
        size={16}
        className="shrink-0 text-brand-600"
      />

      <h2 className="font-display text-sm font-bold text-ink-900 sm:text-base">
        {title}
      </h2>

    </div>
  );
}


/* ================================================================
   DOCTOR MINI STAT
================================================================ */

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">

      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <Icon size={13} />
      </span>

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-900/40">
          {label}
        </p>

        <p className="mt-0.5 text-[11px] font-semibold leading-4 text-ink-900">
          {value}
        </p>
      </div>

    </div>
  );
}


/* ================================================================
   APPOINTMENT TYPE BUTTON
================================================================ */

function AppointmentTypeButton({
  selected,
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-xl border p-3 text-left
        transition-all duration-200
        ${
          selected
            ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
            : 'border-sand-200 bg-white text-ink-900/65 hover:border-brand-300 hover:bg-brand-50/30'
        }
      `}
    >

      <span
        className={`
          grid h-9 w-9 shrink-0 place-items-center rounded-full
          ${
            selected
              ? 'bg-brand-600 text-white'
              : 'bg-sand-100 text-brand-600'
          }
        `}
      >
        <Icon size={15} />
      </span>

      <span className="min-w-0">
        <span className="block text-xs font-bold">
          {title}
        </span>

        <span className="mt-0.5 block text-[10px] text-current/55">
          {description}
        </span>
      </span>

      {selected && (
        <span className="ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
          <CheckCircle2 size={13} />
        </span>
      )}

    </button>
  );
}


/* ================================================================
   SUMMARY ROW
================================================================ */

function SummaryRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">

      <span className="flex min-w-0 items-center gap-2 text-[10px] text-ink-900/50 sm:text-[11px]">
        <Icon
          size={13}
          className="shrink-0 text-brand-600"
        />

        <span>{label}</span>
      </span>

      <span className="max-w-[125px] text-right text-[10px] font-bold leading-4 text-ink-900 sm:text-[11px]">
        {value}
      </span>

    </div>
  );
}


/* ================================================================
   QR CODE
================================================================ */

function QrCode() {
  return (
    <div
      aria-label="Appointment QR code"
      className="
        relative grid h-16 w-16 shrink-0
        grid-cols-7 grid-rows-7 gap-0.5
        overflow-hidden rounded-md bg-white p-1
        shadow-[inset_0_0_0_1px_rgba(36,71,201,0.15)]
      "
    >

      {/* Top Left */}
      <span className="absolute left-1 top-1 h-4 w-4 border-[3px] border-ink-900" />
      <span className="absolute left-[7px] top-[7px] h-1.5 w-1.5 bg-ink-900" />

      {/* Top Right */}
      <span className="absolute right-1 top-1 h-4 w-4 border-[3px] border-ink-900" />
      <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 bg-ink-900" />

      {/* Bottom Left */}
      <span className="absolute bottom-1 left-1 h-4 w-4 border-[3px] border-ink-900" />
      <span className="absolute bottom-[7px] left-[7px] h-1.5 w-1.5 bg-ink-900" />

      {/* QR Pattern */}
      <span className="col-start-4 row-start-2 bg-brand-600" />
      <span className="col-start-5 row-start-2 bg-ink-900" />
      <span className="col-start-6 row-start-2 bg-brand-600" />

      <span className="col-start-3 row-start-3 bg-ink-900" />
      <span className="col-start-5 row-start-3 bg-brand-600" />
      <span className="col-start-7 row-start-3 bg-ink-900" />

      <span className="col-start-3 row-start-4 bg-brand-600" />
      <span className="col-start-4 row-start-4 bg-ink-900" />
      <span className="col-start-6 row-start-4 bg-ink-900" />

      <span className="col-start-4 row-start-5 bg-brand-600" />
      <span className="col-start-5 row-start-5 bg-ink-900" />
      <span className="col-start-7 row-start-5 bg-brand-600" />

      <span className="col-start-3 row-start-6 bg-ink-900" />
      <span className="col-start-5 row-start-6 bg-brand-600" />
      <span className="col-start-6 row-start-6 bg-ink-900" />

      <span className="col-start-4 row-start-7 bg-ink-900" />
      <span className="col-start-6 row-start-7 bg-brand-600" />

    </div>
  );
}


/* ================================================================
   CALENDAR
================================================================ */

function CalendarPicker({ value, onChange }) {
  const days = [
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
  ];

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div>

      {/* Calendar Header */}
      <div className="mb-3 flex items-center justify-between">

        <div>
          <p className="text-xs font-bold text-ink-900">
            May 2026
          </p>

          <p className="mt-0.5 text-[9px] text-ink-900/40">
            Select a date
          </p>
        </div>

        <div className="flex gap-1">

          <button
            type="button"
            className="
              grid h-6 w-6 place-items-center rounded-md
              border border-sand-200 bg-white
              text-xs text-ink-900/50
              transition hover:border-brand-300 hover:text-brand-600
            "
          >
            ‹
          </button>

          <button
            type="button"
            className="
              grid h-6 w-6 place-items-center rounded-md
              border border-sand-200 bg-white
              text-xs text-ink-900/50
              transition hover:border-brand-300 hover:text-brand-600
            "
          >
            ›
          </button>

        </div>

      </div>

      {/* Week Days + Dates */}
      <div className="grid grid-cols-7 gap-1 text-center">

        {weekDays.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="py-1 text-[8px] font-bold text-ink-900/35 sm:text-[9px]"
          >
            {day}
          </span>
        ))}

        {days.map((day, index) => {

          const selected =
            value.endsWith(` ${day}`) ||
            (day === '25' && !value);

          const previousMonth = index < 7;

          return (
            <button
              type="button"
              key={`${day}-${index}`}
              onClick={() => {
                const numericDay = Number(day);

                const dayName =
                  numericDay === 25
                    ? 'Sat'
                    : numericDay === 24
                      ? 'Fri'
                      : numericDay === 23
                        ? 'Thu'
                        : numericDay === 22
                          ? 'Wed'
                          : numericDay === 21
                            ? 'Tue'
                            : numericDay === 20
                              ? 'Mon'
                              : numericDay === 19
                                ? 'Sun'
                                : 'Sat';

                onChange(`${dayName}, May ${day}`);
              }}
              className={`
                grid aspect-square place-items-center rounded-md
                text-[9px] font-semibold transition-all
                sm:text-[10px]
                ${
                  selected
                    ? 'bg-brand-600 text-white shadow-sm'
                    : previousMonth
                      ? 'text-ink-900/30 hover:bg-brand-50'
                      : 'text-ink-900/70 hover:bg-brand-50 hover:text-brand-600'
                }
              `}
            >
              {day}
            </button>
          );
        })}

      </div>
    </div>
  );
}


/* ================================================================
   ICON
================================================================ */

function BriefcaseIcon(props) {
  return <Stethoscope {...props} />;
}