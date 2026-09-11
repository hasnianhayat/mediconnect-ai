import { useState } from 'react';
import { CalendarDays, ChevronDown, CreditCard, FileText, HelpCircle, Search, Stethoscope, UserRound } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const topics = [
  { title: 'Appointments', description: 'Booking, rescheduling and cancelling help.', icon: CalendarDays, tone: 'text-brand-600 bg-brand-50' },
  { title: 'Doctor Booking', description: 'Find and book the right doctor.', icon: Stethoscope, tone: 'text-mint-500 bg-mint-50' },
  { title: 'Reports & Prescriptions', description: 'View, download and manage your medical documents.', icon: FileText, tone: 'text-brand-600 bg-brand-50' },
  { title: 'Account & Profile', description: 'Update your profile and manage account settings.', icon: UserRound, tone: 'text-coral-500 bg-coral-50' },
  { title: 'Payments & Billing', description: 'Billing issues and payment help.', icon: CreditCard, tone: 'text-brand-600 bg-brand-50' },
];
const faqs = [
  { q: 'How do I book an appointment?', a: 'Go to Find Doctor, select a doctor, choose a date & time, fill in your details, and confirm your booking.' },
  { q: 'How can I cancel or reschedule my appointment?', a: 'Open My Appointments, find the appointment and use the Cancel or Reschedule action.' },
  { q: 'Where can I find my medical reports?', a: 'All your reports are available under My Reports in your dashboard.' },
  { q: 'How do I update my profile information?', a: 'Go to Profile from the sidebar and update your details, then save changes.' },
  { q: 'How can I contact a doctor?', a: 'You can send reports or messages directly from an appointment or through the doctor\'s profile.' },
];

export default function HelpSupport() {
  const [openIdx, setOpenIdx] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 overflow-x-hidden">
      <PageHeader icon={HelpCircle} title="Help & Support" subtitle="We're here to help you with anything you need." />

      <Card className="relative mb-7 min-h-[170px] overflow-hidden !border-0 !shadow-none !p-5 sm:min-h-[200px] sm:!px-8 sm:!py-7">
        <div className="relative z-10 max-w-[55%] sm:max-w-[50%]">
          <h3 className="font-display text-lg font-bold text-brand-700 sm:text-xl">How can we help you?</h3>
          <p className="mt-2 max-w-[310px] text-xs leading-5 text-ink-900/65 sm:text-sm">Search your question or choose a topic to find the help you need.</p>
          <label className="mt-4 flex h-11 max-w-[300px] items-center gap-2 rounded-lg border-0 bg-white px-3 text-xs text-ink-900/45 shadow-none">
            <Search size={18} className="shrink-0 text-brand-600" />
            <input type="text" placeholder="Search your question..." className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-900/45" />
          </label>
        </div>
        <img src="/images/doctor7.png" alt="Support doctor" className="absolute bottom-0 right-0 h-[162px] w-[48%] object-contain object-right-bottom sm:right-8 sm:h-[198px] sm:w-[38%]" />
      </Card>

      <section className="mb-7">
        <h2 className="mb-4 font-display text-base font-bold text-brand-700 sm:text-lg">Popular Help Topics</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {topics.map(({ title, description, icon: Icon, tone }) => (
            <Card key={title} className="min-w-0 !rounded-lg !border-0 !shadow-none !p-4 text-center sm:!p-5">
              <span className={`mx-auto mb-3 grid h-14 w-14 place-items-center rounded-xl ${tone} sm:h-16 sm:w-16`}><Icon size={30} strokeWidth={2} /></span>
              <p className="text-xs font-bold leading-4 text-brand-700 sm:text-sm">{title}</p>
              <p className="mt-2 text-[11px] leading-5 text-ink-900/55">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="mb-7 !rounded-lg !border-0 !shadow-none !p-4 sm:!p-6">
        <h3 className="mb-2 font-display text-base font-bold text-brand-700 sm:text-lg">Frequently Asked Questions</h3>
        <div className="mb-4 border-b border-sand-200 pb-4">
          <p className="mb-2 text-xs font-bold text-ink-900/55">Suggested Questions</p>
          <div className="flex flex-wrap gap-2">
            {faqs.slice(0, 4).map((faq, index) => (
              <button
                key={faq.q}
                type="button"
                onClick={() => setOpenIdx(index)}
                className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-left text-[11px] font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-100 sm:text-xs"
              >
                {faq.q}
              </button>
            ))}
          </div>
        </div>
        <div>
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left text-xs font-semibold text-ink-900 sm:text-sm">
                <span>{f.q}</span>
                <ChevronDown size={15} className={`shrink-0 text-ink-900/45 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === i && <p className="max-w-3xl pb-3 text-xs leading-5 text-ink-900/55 sm:text-sm">{f.a}</p>}
            </div>
          ))}
        </div>
      </Card>

      <Card className="relative flex min-h-[100px] items-center overflow-hidden !rounded-lg !border-0 !shadow-none !px-5 !py-4 sm:min-h-[120px] sm:!px-8">
        <div className="relative z-10 max-w-[62%] sm:max-w-[58%]">
          <h3 className="font-display text-base font-bold text-brand-700 sm:text-lg">Still need help?</h3>
          <p className="mt-1 text-[11px] leading-5 text-ink-900/65 sm:text-xs">Can't find an answer? Contact our support team and let us solve your problem.</p>
          <Button onClick={() => navigate('/patient/contact-us')} size="sm" className="mt-2 rounded-md px-3 py-1.5 text-xs !shadow-none">Contact Us</Button>
        </div>
        <img src="/images/doctor7.png" alt="Support team member" className="absolute bottom-0 right-2 h-[100px] w-[34%] object-contain object-right-bottom sm:right-10 sm:h-[120px] sm:w-[25%]" />
      </Card>
    </div>
  );
}
