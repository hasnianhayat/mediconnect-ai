import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

export default function ResetPassword() {
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <h1 className="mb-1 font-display text-2xl font-bold text-ink-900">Set a New Password</h1>
      <p className="mb-8 text-sm text-ink-900/55">Choose a strong password you haven't used before.</p>
      <div className="card p-7">
        <ResetPasswordForm />
      </div>
    </section>
  );
}
