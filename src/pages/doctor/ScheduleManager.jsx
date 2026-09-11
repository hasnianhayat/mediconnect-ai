import { useState } from 'react';
import { CalendarClock, Trash2, Info, Clock3, Save, Pencil, X } from 'lucide-react';
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

export default function ScheduleManager() {
  const [days, setDays] = useState(initialDays);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({ start: '', end: '' });
  const [saved, setSaved] = useState(false);
  const toggle = (i) => setDays((d) => d.map((x, idx) => (idx === i ? { ...x, on: !x.on } : x)));
  const startEdit = (dayIndex, shift) => {
    const day = days[dayIndex];
    setEditing({ dayIndex, shift });
    setDraft({
      start: shift === 'first' ? day.start : day.secondStart,
      end: shift === 'first' ? day.end : day.secondEnd,
    });
  };
  const cancelEdit = () => setEditing(null);
  const saveEdit = () => {
    if (!draft.start.trim() || !draft.end.trim()) return;
    setDays((current) => current.map((day, index) => {
      if (!editing || index !== editing.dayIndex) return day;
      return editing.shift === 'first'
        ? { ...day, start: draft.start.trim(), end: draft.end.trim() }
        : { ...day, secondStart: draft.start.trim(), secondEnd: draft.end.trim() };
    }));
    setSaved(false);
    setEditing(null);
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
          <span><strong>Note:</strong> Your appointment slots will be created automatically in 15-minute intervals based on the above timings.</span>
        </p>

        <div className="hidden grid-cols-[100px_90px_minmax(260px,1fr)_minmax(260px,1fr)_32px] items-center gap-4 px-3 pb-3 text-[11px] font-bold text-ink-900/60 lg:grid">
          <span>Day</span><span>Available</span><span>Time Range 1 (Required)</span><span>Time Range 2 (Optional)</span><span />
        </div>
        <div className="space-y-3">
          {days.map((d, i) => (
            <div key={d.day} className="grid gap-4 bg-white p-4 sm:p-5 lg:grid-cols-[100px_90px_minmax(260px,1fr)_minmax(260px,1fr)_32px] lg:items-center lg:gap-4">
              <p className="font-display text-sm font-bold text-brand-700">{d.day}</p>
              <button
                type="button"
                aria-label={`Toggle ${d.day}`}
                onClick={() => toggle(i)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${d.on ? 'bg-mint-500' : 'bg-sand-200'}`}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${d.on ? 'left-6' : 'left-1'}`} />
              </button>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-[auto_minmax(100px,1fr)_auto_minmax(100px,1fr)] sm:items-center">
                <span className="text-xs font-bold text-ink-900/55">Start</span>
                {editing?.dayIndex === i && editing.shift === 'first' ? <input value={draft.start} onChange={(e) => setDraft({ ...draft, start: e.target.value })} aria-label={`${d.day} first shift start`} className="field-input min-w-0 rounded-lg bg-sand-50 px-3 py-2 text-xs" /> : <span className="flex items-center justify-between rounded-lg bg-sand-50 px-3 py-2 text-xs font-bold text-ink-900"><Clock3 size={15} className="text-brand-600" />{d.start}</span>}
                <span className="text-xs font-bold text-ink-900/55">End</span>
                {editing?.dayIndex === i && editing.shift === 'first' ? <input value={draft.end} onChange={(e) => setDraft({ ...draft, end: e.target.value })} aria-label={`${d.day} first shift end`} className="field-input min-w-0 rounded-lg bg-sand-50 px-3 py-2 text-xs" /> : <span className="flex items-center justify-between rounded-lg bg-sand-50 px-3 py-2 text-xs font-bold text-ink-900"><Clock3 size={15} className="text-brand-600" />{d.end}</span>}
                <button type="button" onClick={() => startEdit(i, 'first')} className="col-span-2 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 sm:col-span-4 sm:justify-self-end"><Pencil size={13} /> Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-[auto_minmax(100px,1fr)_auto_minmax(100px,1fr)] sm:items-center">
                <span className="text-xs font-bold text-ink-900/55">Start</span>
                {editing?.dayIndex === i && editing.shift === 'second' ? <input value={draft.start} onChange={(e) => setDraft({ ...draft, start: e.target.value })} placeholder="5:00 PM" aria-label={`${d.day} second shift start`} className="field-input min-w-0 rounded-lg bg-sand-50 px-3 py-2 text-xs" /> : <span className="flex items-center justify-between rounded-lg bg-sand-50 px-3 py-2 text-xs font-bold text-ink-900/45"><Clock3 size={15} className="text-teal-600" />{d.secondStart || '--:-- --'}</span>}
                <span className="text-xs font-bold text-ink-900/55">End</span>
                {editing?.dayIndex === i && editing.shift === 'second' ? <input value={draft.end} onChange={(e) => setDraft({ ...draft, end: e.target.value })} placeholder="8:00 PM" aria-label={`${d.day} second shift end`} className="field-input min-w-0 rounded-lg bg-sand-50 px-3 py-2 text-xs" /> : <span className="flex items-center justify-between rounded-lg bg-sand-50 px-3 py-2 text-xs font-bold text-ink-900/45"><Clock3 size={15} className="text-teal-600" />{d.secondEnd || '--:-- --'}</span>}
                <button type="button" onClick={() => startEdit(i, 'second')} className="col-span-2 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 sm:col-span-4 sm:justify-self-end"><Pencil size={13} /> Edit Second Shift</button>
                {editing?.dayIndex === i && <div className="col-span-2 flex gap-2 sm:col-span-4 sm:justify-end"><button type="button" onClick={saveEdit} className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-xs font-bold text-white hover:bg-brand-700"><Save size={13} /> Save</button><button type="button" onClick={cancelEdit} className="inline-flex items-center gap-1 rounded-lg border border-sand-200 px-3 py-2 text-xs font-bold text-ink-900/70 hover:bg-sand-100"><X size={13} /> Cancel</button></div>}
              </div>
              <button type="button" aria-label={`Remove ${d.day} schedule`} className="justify-self-start text-coral-500 hover:text-coral-600 lg:justify-self-center"><Trash2 size={20} /></button>
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
