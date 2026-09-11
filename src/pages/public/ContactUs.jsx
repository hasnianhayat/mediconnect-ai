import { useState } from 'react';
import { FolderOpen, Mail, MessageCircle, Send, Stethoscope, UserRound } from 'lucide-react';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function ContactUs() {
  const [role, setRole] = useState('patient');
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:gap-10 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-700 sm:text-3xl">We&apos;re Here to Help!</h1>
        <p className="mt-3 max-w-[230px] text-sm  font-bold leading-5 text-ink-900">
          Have a question, feedback, or need assistance? Fill out the form and our team will get back to you soon.
        </p>
        <div className="mt-5 flex justify-center lg:justify-start">
          <img src="/images/doctor3.png" alt="Doctor ready to help" className="h-64 w-auto object-contain sm:h-[400px]" />
        </div>
      </div>

      <Card className="p-5 sm:p-6">
        <h2 className="font-display text-xl font-bold text-brand-700">Contact Us</h2>
        <p className="mt-2 text-[10px] font-bold leading-4 text-ink-900 ">Please fill in your details below and select your role.<br />We will reach out to you shortly.</p>
        {sent ? (
          <div className="mt-5 rounded-xl bg-mint-400/10 p-6 text-center text-sm font-semibold text-mint-500">
            Thanks — your message has been sent. Our team will reach out shortly.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-5 space-y-3.5">
            <Input label="Full Name" icon={UserRound} required placeholder="Enter your full name" />
            <Input label="Email Address" icon={Mail} type="email" required placeholder="Enter your email address" />
            <Input label="Subject" icon={FolderOpen} required placeholder="Enter subject" />
            <div>
              <label className="field-label">You are a</label>
              <div className="flex gap-4">
                {['patient', 'doctor'].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex flex-1 items-center justify-between rounded-lg border px-3.5 py-2.5 text-xs font-semibold capitalize transition ${
                      role === r ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-sand-200 text-ink-900/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {r === 'patient' ? <UserRound size={16} /> : <Stethoscope size={16} />}
                      {r}
                    </span>
                    <span className={`h-3 w-3 rounded-full border ${role === r ? 'border-brand-600 bg-brand-600 ring-2 ring-brand-100' : 'border-ink-900/25'}`} />
                  </button>
                ))}
              </div>
            </div>
            <Textarea label="Message" required placeholder="Write your message here..." className="min-h-[104px]" />
            <Button type="submit" icon={Send} className="w-full">Send Message</Button>
          </form>
        )}
      </Card>
    </section>
  );
}
