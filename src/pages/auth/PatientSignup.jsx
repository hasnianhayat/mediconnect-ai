import Avatar from '../../components/common/Avatar';
import PatientSignupForm from '../../components/auth/PatientSignupForm';
import WhyJoinSection from '../../components/auth/WhyJoinSection';

export default function PatientSignup() {
  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold text-brand-600">Join as a Patient</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-900">Create Your <br /> <span className="text-brand-600">Patient</span> Account</h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-900 font-bold">Join Mediconnect AI and access smarter healthcare solutions.</p>
        <div className="mt-8 flex justify-center lg:justify-start">
         <img src="/images/doctor3.png" alt="" />
        </div>
      </div>
      <div className="card p-8">
        <h2 className="mb-6 font-display text-xl font-bold text-brand-600">Patient Sign Up</h2>
        <PatientSignupForm />
      </div>
      <WhyJoinSection className="lg:col-span-2" />
    </section>
  );
}
