import { Link, useNavigate } from 'react-router-dom';
import { User, Stethoscope, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const options = [
  {
    key: 'patient',
    label: 'Patient',
    description: 'Book appointments, manage health records and connect with trusted doctors.',
    icon: User,
    route: '/signup/patient',
    iconClass: 'border-[#BFE3FF] bg-[#EAF6FF] text-[#1E88E5]',
    buttonClass: 'bg-brand-500 text-white hover:bg-brand-600',
  },
  {
    key: 'doctor',
    label: 'Doctor',
    description: 'Manage your patients, appointments and grow your healthcare practice.',
    icon: Stethoscope,
    route: '/signup/doctor',
    iconClass: 'border-[#C7F1D9] bg-[#EAFBF3] text-[#1FA76A]',
    buttonClass: 'bg-brand-500 text-white hover:bg-brand-600',
  },
];

export default function SignupForm() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-4 md:grid-cols-2">
        {options.map(({ key, label, description, icon: Icon, route, iconClass, buttonClass }) => (
          <div
            key={key}
            className="rounded-[22px] border border-[#E5EAF5] bg-white p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-200"
          >
            <div className="flex items-center gap-4">
              <span className={`grid h-16 w-16 place-items-center rounded-full border-2 ${iconClass}`}>
                <Icon size={34} strokeWidth={2} />
              </span>
              <h3 className="text-xl font-semibold text-[#1B2737]">Join as a {label}</h3>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#5D6877]">{description}</p>

            <Button
              onClick={() => navigate(route)}
              variant="mint"
              icon={ArrowRight}
              iconPosition="right"
              className={`mt-5 min-h-12 w-full justify-center rounded-xl px-5 py-3 text-sm ${buttonClass}`}
            >
              Continue as {label}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[#5D6877]">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-[#1B5BFF] hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
