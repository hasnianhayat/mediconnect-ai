import { useNavigate } from 'react-router-dom';
import { Gauge, Search, Bot, HeartPulse, Activity, Weight, Flame, Droplets, Moon } from 'lucide-react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import QuickAction from '../../components/dashboard/QuickAction';
import RecentAppointments from '../../components/dashboard/RecentAppointments';
import Card from '../../components/common/Card';
import { patientAppointments } from '../../data/doctors';

const vitals = [
  { icon: HeartPulse, label: 'Heart Rate', value: '72', unit: 'bpm', tone: 'text-white bg-coral-400' },
  { icon: Activity, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', tone: 'text-white bg-amber-400' },
  { icon: Weight, label: 'Weight', value: '70', unit: 'kg', tone: 'text-white bg-brand-400' },
  { icon: Flame, label: 'Calories', value: '450', unit: 'kcal', tone: 'text-white bg-mint-400' },
];

const tips = [
  { icon: Droplets, text: 'Stay Hydrated: Aim for 8 glasses of water.' },
  { icon: Activity, text: 'Daily Activity: Incorporate 30 mins of exercise.' },
  { icon: Moon, text: 'Prioritize Sleep: Ensure 7-9 hours of quality rest.' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <WelcomeBanner
        name="Patient Name"
        tagline="Here's your health overview. Stay healthy and connected!"
        illustration={(
          <img
            src="/images/doctor5.png"
            alt="Doctor"
            className="hidden h-full w-full object-contain object-right-bottom sm:block"
          />
        )}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <QuickAction icon="/icons/icon2.png" title="BMI Calculator" description="Check your Body Mass Index and know your health status." actionLabel="Calculate BMI" to="/patient/bmi-calculator" tone="mint" />
        <QuickAction icon="/icons/icon3.png" title="Find Doctor" description="Search and connect with trusted doctors near you." actionLabel="Find Doctor" to="/patient/find-doctor" tone="brand" />
        <QuickAction icon="/icons/icon4.png" title="AI Assistant" description="Get instant answers to your health questions." actionLabel="Ask AI Assistant" to="/patient/ai-assistant" tone="teal" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="!border-0 !shadow-none p-4">
          <h3 className="mb-3 font-display text-sm font-semibold text-ink-900">Daily Vitals</h3>
          <div className="grid grid-cols-2 gap-3">
            {vitals.map((v) => (
              <div key={v.label} className="flex items-center gap-3 rounded-xl p-3">
                <span className={`grid h-9 w-9 place-items-center rounded-lg ${v.tone}`}><v.icon size={17} /></span>
                <div>
                  <p className="text-xs text-ink-900/45">{v.label}</p>
                  <p className="font-display font-bold text-ink-900">{v.value} <span className="text-xs font-normal text-ink-900/40">{v.unit}</span></p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="!border-0 !shadow-none p-4">
          <h3 className="mb-3 font-display text-sm font-semibold text-ink-900">Wellness Tips</h3>
          <ul className="space-y-2.5">
            {tips.map((t) => (
              <li key={t.text} className="flex items-start gap-2.5 text-sm font-bold text-ink-900">
                <t.icon size={16} className="mt-0.5 text-brand-500" /> {t.text}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="!border-0 !shadow-none p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-ink-900">Upcoming Appointments</h3>
            <button onClick={() => navigate('/patient/appointments')} className="text-xs font-semibold text-brand-600 hover:underline">View All</button>
          </div>
          <RecentAppointments items={patientAppointments.upcoming} />
        </Card>
        <Card className="!border-0 !shadow-none p-4">
          <h3 className="mb-3 font-display text-sm font-semibold text-ink-900">Recent Reports</h3>
          <p className="rounded-xl bg-sand-50 py-8 text-center text-sm font-bold text-ink-900">No recent reports available at the moment.</p>
        </Card>
      </div>
    </div>
  );
}
