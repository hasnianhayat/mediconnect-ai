import { Link } from 'react-router-dom';
import { CheckCircle2, Clock3, Headphones, ShieldCheck } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import WhyJoinSection from '../../components/auth/WhyJoinSection';

export default function VerificationPending() {
  return (
    <>
    <section className="mx-auto grid max-w-4xl gap-8 px-6 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10">
      <div className="flex flex-col">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-700 sm:text-3xl">Thank You!</h1>
          <p className="mt-3 max-w-[220px] text-xs leading-5 text-ink-900">Your profile has been submitted successfully.</p>
          <p className="mt-1 text-xs font-semibold text-brand-700">We are verifying your details.</p>
        </div>
        <div className="mt-5 flex justify-center lg:mt-3">
          <img src="/images/doctor3.png" alt="Doctor profile illustration" className="h-56 w-auto object-contain sm:h-64" />
        </div>
        <div className="mt-5 flex items-center gap-3 self-center lg:mt-2 lg:self-start">
          <Headphones size={27} className="text-brand-700" />
          <div>
            <p className="text-xs font-bold text-brand-700">Need help?</p>
            <p className="mt-1 max-w-[190px] text-[10px] leading-4 text-ink-900/75">If you have any questions or need assistance, our support team is here to help you.</p>
          </div>
          <Link to="/contact-us" className="ml-3">
            <Button size="sm" className="rounded-md px-4 py-2 text-[10px]">Contact Us</Button>
          </Link>
        </div>
      </div>
      <div className="pt-1">
        <h2 className="font-display text-lg font-bold text-brand-700 sm:text-xl">Profile Verification Status</h2>
        <p className="mt-3 text-[10px] leading-4 text-ink-900/80">We have received your information and documents.<br />Our team is reviewing your profile.</p>
        <div className="mt-5 flex items-center gap-3">
          <Avatar name="Dr. Ali Khan" size={42} className="bg-brand-600" />
          <div>
            <p className="text-xs font-bold text-ink-900">Dr. Ali Khan</p>
            <p className="mt-1 text-[10px] text-ink-900/70">dr.alikhan@example.com</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[10px] font-bold text-brand-700">Status</p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase text-coral-500"><Clock3 size={14} /> Pending</p>
          <p className="mt-2 text-[10px] text-ink-900/75">Your profile is in pending.</p>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <p className="text-[10px] font-bold text-brand-700">Note:</p>
            <p className="mt-2 flex items-start gap-2 text-[10px] leading-4 text-ink-900/75"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-brand-700" />Your profile will be reviewed and verified by our team. After verification, it will be live and visible to patients.</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold text-brand-700"><Clock3 size={16} />Expected Approval Time</p>
            <p className="mt-1 pl-6 text-[10px] text-ink-900/75">Within 24 hours after verification.</p>
          </div>
        </div>
      </div>
    </section>
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
    <WhyJoinSection title="Why Mediconnect AI?" className="lg:col-span-2 !mt-2" />

    </div>
    </>
    
  );
}
