import { useState } from 'react';
import { CalendarClock, Trash2, Info, Clock3, Save, ChevronDown } from 'lucide-react';
import Button from '../../components/common/Button';

const initialDays = [
  { day: 'Monday', on: true, start: '8:00 AM', end: '4:00 PM', secondStart: '5:00 PM', secondEnd: '8:00 PM' },
  { day: 'Tuesday', on: true, start: '8:00 AM', end: '4:00 PM', secondStart: '5:00 PM', secondEnd: '8:00 PM' },
  { day: 'Wednesday', on: true, start: '8:00 AM', end: '4:00 PM', secondStart: '', secondEnd: '' },
  { day: 'Thursday', on: true, start: '8:00 AM', end: '4:00 PM', secondStart: '', secondEnd: '' },
  { day: 'Friday', on: true, start: '8:00 AM', end: '4:00 PM', secondStart: '', secondEnd: '' },
  { day: 'Saturday', on: false, start: '--:-- --', end: '--:-- --', secondStart: '', secondEnd: '' },
  { day: 'Sunday', on: false, start: '--:-- --', end: '--:-- --', secondStart: '', secondEnd: '' },
];

const timeOptions = [
  '8:00 AM', '8:20 AM', '8:40 AM', '9:00 AM', '9:20 AM', '9:40 AM', '10:00 AM', '10:20 AM', '10:40 AM',
  '11:00 AM', '11:20 AM', '11:40 AM', '12:00 PM', '12:20 PM', '12:40 PM', '1:00 PM', '1:20 PM', '1:40 PM',
  '2:00 PM', '2:20 PM', '2:40 PM', '3:00 PM', '3:20 PM', '3:40 PM', '4:00 PM', '4:20 PM', '4:40 PM',
  '5:00 PM', '5:20 PM', '5:40 PM', '6:00 PM', '6:20 PM', '6:40 PM', '7:00 PM', '7:20 PM', '7:40 PM',
  '8:00 PM', '8:20 PM', '8:40 PM'
];

export default function ScheduleManager() {
  const [days, setDays] = useState(initialDays);
  const [saved, setSaved] = useState(false);

  const toggle = (i) => {
    setSaved(false);
    setDays((d) => d.map((x, idx) => (idx === i ? { ...x, on: !x.on } : x)));
  };

  const deleteDay = (dayIndex) => {
    setSaved(false);
    setDays((current) => current.filter((_, index) => index !== dayIndex));
  };

  const updateTimeRange = (dayIndex, shift, field, value) => {
    setSaved(false);
    setDays((current) => current.map((day, index) => {
      if (index !== dayIndex) return day;

      if (shift === 'first') {
        return { ...day, [field]: value };
      }

      return {
        ...day,
        [field === 'start' ? 'secondStart' : 'secondEnd']: value,
      };
    }));
  };

  return (
    <div className="space-y-7 text-ink-900">
      <section className="relative overflow-hidden  px-5 py-7 sm:px-8 sm:py-9 lg:min-h-[250px] lg:px-10">
        <div className="relative z-10 max-w-xl">
          <p className="font-display text-3xl font-bold leading-tight text-brand-600 sm:text-4xl">Welcome,<br />Doctor Name!</p>
          <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-ink-900 sm:text-base">
            Manage your weekly schedule by setting your available days and working hours.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-[44%] items-center justify-end sm:w-[38%] lg:w-[34%]">
          <img src="/images/doctor10.png" alt="Medical schedule illustration" className="hidden h-full w-full object-contain object-right sm:block" />
        </div>
      </section>

      <section>
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-600"><CalendarClock size={25} /></span>
            <h2 className="font-display text-xl font-bold text-brand-600 sm:text-2xl">Weekly Schedule Settings</h2>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-ink-900 sm:text-base">Set your available days and working hours. You can set up to two time ranges per day.</p>
        </div>

        <p className="mb-6 flex items-start gap-3 bg-brand-50 p-4 text-sm font-semibold leading-6 text-brand-700">
          <Info size={21} className="mt-0.5 shrink-0" />
          <span><strong>Note:</strong> Your appointment slots will be created automatically in 20-minute intervals based on the above timings.</span>
        </p>

        <div className="hidden grid-cols-[100px_90px_minmax(260px,1fr)_minmax(260px,1fr)_32px] items-center gap-4 px-3 pb-3 text-[11px] font-bold text-ink-900/60 lg:grid">
          <span>Day</span><span>Available</span><span>Time Range 1 (Required)</span><span>Time Range 2 (Optional)</span><span />
        </div>
        <div className="space-y-3">
          {days.map((d, i) => (
            <div key={d.day} className="card grid max-w-full min-w-0 gap-4 overflow-hidden p-4 sm:p-5 lg:grid-cols-[100px_90px_minmax(0,1fr)_minmax(0,1fr)_36px] lg:items-center lg:gap-4">
              <p className="font-display text-sm font-bold text-brand-700">{d.day}</p>
              <button
                type="button"
                aria-label={`Toggle ${d.day}`}
                onClick={() => toggle(i)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${d.on ? 'bg-mint-500' : 'bg-sand-200'}`}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${d.on ? 'left-6' : 'left-1'}`} />
              </button>

              <div className="min-w-0">
                <div className="grid min-w-0 w-full grid-cols-2 gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
                  <span className="text-xs font-bold text-ink-900/55">Start</span>
                  <div className="relative min-w-0 w-full">
                    <select
                      value={d.start}
                      onChange={(e) => updateTimeRange(i, 'first', 'start', e.target.value)}
                      aria-label={`${d.day} first shift start`}
                      className="field-input min-w-0 w-full appearance-none rounded-lg bg-sand-50 px-3 py-2 pr-8 text-xs"
                    >
                      <option value="">Select start time</option>
                      {timeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-600" />
                  </div>

                  <span className="text-xs font-bold text-ink-900/55">End</span>
                  <div className="relative min-w-0 w-full">
                    <select
                      value={d.end}
                      onChange={(e) => updateTimeRange(i, 'first', 'end', e.target.value)}
                      aria-label={`${d.day} first shift end`}
                      className="field-input min-w-0 w-full appearance-none rounded-lg bg-sand-50 px-3 py-2 pr-8 text-xs"
                    >
                      <option value="">Select end time</option>
                      {timeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-600" />
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <div className="grid min-w-0 w-full grid-cols-2 gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
                  <span className="text-xs font-bold text-ink-900/55">Start</span>
                  <div className="relative min-w-0 w-full">
                    <select
                      value={d.secondStart}
                      onChange={(e) => updateTimeRange(i, 'second', 'start', e.target.value)}
                      aria-label={`${d.day} second shift start`}
                      className="field-input min-w-0 w-full appearance-none rounded-lg bg-sand-50 px-3 py-2 pr-8 text-xs"
                    >
                      <option value="">Select start time</option>
                      {timeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-600" />
                  </div>

                  <span className="text-xs font-bold text-ink-900/55">End</span>
                  <div className="relative min-w-0 w-full">
                    <select
                      value={d.secondEnd}
                      onChange={(e) => updateTimeRange(i, 'second', 'end', e.target.value)}
                      aria-label={`${d.day} second shift end`}
                      className="field-input min-w-0 w-full appearance-none rounded-lg bg-sand-50 px-3 py-2 pr-8 text-xs"
                    >
                      <option value="">Select end time</option>
                      {timeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-600" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label={`Remove ${d.day} schedule`}
                onClick={() => deleteDay(i)}
                className="justify-self-start text-coral-500 hover:text-coral-600 lg:justify-self-center"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => setSaved(true)} className="w-full bg-brand-600 text-white hover:bg-brand-700 sm:w-auto" icon={Save}>Save Schedule</Button>
          {saved && <p className="text-xs font-semibold text-mint-600" role="status">Schedule saved successfully.</p>}
        </div>
      </section>
    </div>
  );
}
