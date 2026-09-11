import Avatar from '../../components/common/Avatar';
import DoctorSignupForm from '../../components/auth/DoctorSignupForm';
import { ShieldCheck, FileCheck2, Lock, Users } from 'lucide-react';
import WhyJoinSection from '../../components/auth/WhyJoinSection';

const points = [
  { icon: ShieldCheck, text: 'Your profile will be live only after verification.' },
  { icon: FileCheck2, text: 'We verify your PMDC license and documents to ensure authenticity and prevent fake profiles.' },
  { icon: Lock, text: 'Your data is safe and secure with us.' },
  { icon: Users, text: 'We are committed to a trusted healthcare community.' },
];

export default function DoctorSignup() {
  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold text-brand-600">Join as a Doctor</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-900">Create Your <br /> <span className="text-brand-600">Doctor  Account</span></h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-900">Join Mediconnect AI and grow your healthcare practice.</p>
        <div className="mt-8 flex justify-center lg:justify-start">
         <img src="/images/doctor3.png" alt="" />
        </div>
        <ul className="mt-8 space-y-3">
          {points.map((p) => (
            <li key={p.text} className="flex items-start gap-2.5 text-sm text-ink-900/65">
              <p.icon size={16} className="mt-0.5 shrink-0 text-mint-500" />
              {p.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-8">
        <h2 className="mb-6 font-display text-xl font-bold text-brand-600">Doctor Sign Up</h2>
        <DoctorSignupForm />
      </div>
      <WhyJoinSection className="lg:col-span-2" />
    </section>
  );
}
