import { Calendar, Clock, MapPin, Send, Stethoscope, Tag } from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

export default function AppointmentCard({
  appt,
  variant = 'upcoming',
  onViewDetails,
  onReschedule,
  onCancel,
  onSendReport,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-card sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <Avatar
          name={appt.doctor}
          src={appt.image || '/images/image.png'}
          size={62}
          className="!rounded-[18px] bg-sand-100 object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-extrabold leading-none text-brand-700">{appt.doctor}</p>
          <p className="mt-2 flex items-center gap-2 text-[12px] font-bold text-ink-900">
            <Stethoscope size={12} className="text-brand-700" />
            <span>{appt.specialty}</span>
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-[11px] font-bold text-ink-900">
            <MapPin size={11} className="text-brand-700" />
            <span>{appt.location}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-[12px] font-bold text-ink-900 lg:min-w-[220px] lg:flex-1">
        <p className="flex items-center gap-2 text-ink-900"><Calendar size={14} className="text-brand-700" /> {appt.date}</p>
        <p className="flex items-center gap-2 text-ink-900"><Clock size={14} className="text-brand-700" /> {appt.time}</p>

        {appt.reason && (
          <div className="flex items-center gap-2 text-[12px] font-bold text-ink-900">
            <Tag size={14} className="text-brand-700" />
            <span>{appt.reason}</span>
          </div>
        )}
      </div>

      <div className="grid w-full gap-2.5 sm:grid-cols-2 lg:ml-auto lg:w-[260px]">
        {variant === 'upcoming' && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(appt)}
              className="w-full !border-0 !shadow-none !px-3 !py-2 !text-[11px] !font-semibold !text-brand-700 hover:!bg-brand-50"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReschedule?.(appt)}
              className="w-full !border-0 !shadow-none !px-3 !py-2 !text-[11px] !font-semibold !text-brand-700 hover:!bg-brand-50"
            >
              Reschedule
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancel?.(appt)}
              className="w-full !border-0 !shadow-none !px-3 !py-2 !text-[11px] !font-semibold"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              icon={Send}
              onClick={() => onSendReport?.(appt)}
              className="w-full !border-0 !shadow-none !px-3 !py-2 !text-[11px] !font-semibold"
            >
              Send Report
            </Button>
          </>
        )}

        {variant === 'pending' && (
          <div className="flex flex-col gap-2 sm:col-span-2">
            <span className="chip-pending justify-center text-[9px]">Pending Approval</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(appt)}
              className="w-full !border-0 !shadow-none !px-3 !py-2 !text-[11px] !font-semibold !text-brand-700 hover:!bg-brand-50"
            >
              View Details
            </Button>
          </div>
        )}

        {variant === 'history' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(appt)}
            className="w-full !border-0 !shadow-none !px-3 !py-2 !text-[11px] !font-semibold !text-brand-700 hover:!bg-brand-50 sm:col-span-2"
          >
            View Details
          </Button>
        )}
      </div>
    </div>
  );
}
