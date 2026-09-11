import LoginForm from '../../components/auth/LoginForm';
import AuthIllustration from '../../components/auth/AuthIllustration';
import WhyJoinSection from '../../components/auth/WhyJoinSection';

export default function Login() {
  return (
    <section className="min-h-full ">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-semibold text-ink-900 sm:text-sm">Welcome to</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-brand-700 sm:text-3xl">Mediconnect <span className="text-teal-500">AI</span></h1>
          <h2 className="mt-5 font-display text-lg font-bold text-ink-900 sm:text-xl">Login Here</h2>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-ink-900/65 sm:text-sm">
            Access your account to find trusted doctors, book appointments and manage your healthcare easily.
          </p>
          <div className="mx-auto mt-7 max-w-md sm:mt-10">
            <img src="/images/doctor-login.png" alt="" />
          </div>
        </div>

        <div className="w-full max-w-md justify-self-center lg:max-w-none">
          <h2 className="mb-5 font-display text-lg font-bold text-brand-700 sm:text-xl">Login to Your Account</h2>
          <LoginForm />
        </div>
      </div>

      <WhyJoinSection title="Why Login to Mediconnect AI?" />
      </div>
    </section>
  );
}
