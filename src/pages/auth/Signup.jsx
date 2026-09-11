import SignupForm from '../../components/auth/SignupForm';
import WhyJoinSection from '../../components/auth/WhyJoinSection';

export default function Signup() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#1E2A39] sm:text-[2.5rem]">Create Your Account</h1>
        <p className="mt-3 text-sm leading-6 font-bold text-[#1E2A39]">
          Join Mediconnect AI and access smarter healthcare solutions.
          <span className="mt-1 block">Choose how you want to continue.</span>
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <img
          src="/images/doctor-login.png"
          alt="Doctor and patient illustration"
          className="h-52 w-auto object-contain sm:h-72"
        />
      </div>

      <div className="mt-5">
        <SignupForm />
      </div>

      <WhyJoinSection />
    </section>
  );
}
