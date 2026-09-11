import { useState } from 'react';

export const APPOINTMENT_DURATION_MINUTES = 40;
const SLOTS = ['10:00 AM', '10:40 AM', '11:20 AM', '12:00 PM', '12:40 PM', '01:20 PM', '02:00 PM', '02:40 PM'];

export default function TimeSlotPicker({ slots = SLOTS, onSelect = () => {} }) {
  const [active, setActive] = useState(slots[2]);
  return (
    <div>
      <div className="grid grid-cols-4 gap-2.5">
        {slots.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => { setActive(s); onSelect(s); }}
            className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              active === s ? 'border-brand-600 bg-brand-600 text-white' : 'border-sand-200 text-ink-900/70 hover:border-brand-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-900/40">Each slot duration is {APPOINTMENT_DURATION_MINUTES} minutes</p>
    </div>
  );
}
