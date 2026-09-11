import { Clock3, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const benefits = [
  {
    title: 'Personalized Experience',
    description: 'Manage your profile and appointments with ease.',
    icon: Sparkles,
    color: 'bg-brand-600',
  },
  {
    title: 'Secure & Safe',
    description: 'Your data is protected with healthcare-grade security.',
    icon: ShieldCheck,
    color: 'bg-green-500',
  },
  {
    title: 'Quick Booking',
    description: 'Find and book the right doctor in just a few clicks.',
    icon: Clock3,
    color: 'bg-amber-500',
  },
  {
    title: 'Health Records',
    description: 'Access medical history and appointments in one place.',
    icon: FileText,
    color: 'bg-purple-500',
  },
];

export default function WhyJoinSection({ title = 'Why Join Mediconnect AI?', className = '' }) {
  return (
    <section className={`mt-12 sm:mt-16 ${className}`}>
      <h2 className="text-center font-display text-2xl font-bold text-ink-900 sm:text-3xl">{title}</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ title: benefitTitle, description, icon: Icon, color }) => (
          <article
            key={benefitTitle}
            className="rounded-2xl border border-[#E5EAF5] bg-white p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]"
          >
            <div className={`mb-3 grid h-12 w-12 place-items-center rounded-full text-white ${color}`}>
              <Icon size={20} />
            </div>
            <h3 className="text-base font-semibold text-ink-900">{benefitTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-900/60">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}