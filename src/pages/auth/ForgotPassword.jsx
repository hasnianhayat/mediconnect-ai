import { CheckCircle2, KeyRound, Mail, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import Card from '../../components/common/Card';
import WhyJoinSection from '../../components/auth/WhyJoinSection';

const resetSteps = [
  { title: 'Choose an Option', text: 'Select to receive the code via Email or Mobile Number.', icon: Mail },
  { title: 'Enter Email or Number', text: 'Enter your registered email address or mobile number.', icon: UserRound },
  { title: 'Get Verification Code', text: 'We will send a 6-digit verification code to your email or number.', icon: ShieldCheck },
  { title: 'Enter Verification Code', text: 'Enter the code you received and click Send Code.', icon: KeyRound },
  { title: 'Create New Password', text: 'Enter your new password and confirm it.', icon: LockKeyhole },
  { title: 'Password Updated', text: 'Your password has been reset successfully. You can now log in.', icon: CheckCircle2 },
];

export default function ForgotPassword() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:gap-10 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Forgot Password?</h1>
        <p className="mt-2 max-w-sm text-sm font-bold leading-5 text-ink-900">No worries! We&apos;ll help you <br></br> reset your password.</p>
        <div className="mt-4 flex justify-center lg:justify-start">
          <img src="/images/doctor4.png" alt="Doctor helping with password recovery" className="h-56 w-auto object-contain sm:h-[400px]" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-700">
          <LockKeyhole size={16} />
          Your account stays secure with us.
        </div>
      </div>
      <Card className="p-5 sm:p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-brand-700">Reset Your Password</h2>
        <ForgotPasswordForm />
      </Card>
      <section className="lg:col-span-2">
        <h2 className="text-center font-display text-xl font-bold text-brand-700 sm:text-2xl">How to Reset Your Password?</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {resetSteps.map(({ title, text, icon: Icon }, index) => (
            <article key={title} className="text-center">
              <div className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-[10px] font-bold text-white">{index + 1}</div>
              <Icon size={20} className="mx-auto mt-3 text-brand-700" />
              <h3 className="mt-2 text-[10px] font-bold text-brand-700">{title}</h3>
              <p className="mt-1 text-[10px] leading-4 text-ink-900/70">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <WhyJoinSection title="Why Mediconnect AI?" className="lg:col-span-2 !mt-2" />
    </section>
  );
}
