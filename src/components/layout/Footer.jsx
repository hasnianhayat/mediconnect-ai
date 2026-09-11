import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';

const quickLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'My Appointments', to: '/patient/appointments' },
  { label: 'Find Doctor', to: '/find-doctor' },
  { label: 'AI Assistant', to: '/patient/ai-assistant' },
  { label: 'My Reports', to: '/patient/reports' },
  { label: 'Help & Support', to: '/patient/help-support' },
];

const doctorLinks = [
  { label: 'Join as Doctor', to: '/signup/doctor' },
  { label: 'Doctor Login', to: '/login' },
  { label: 'Doctor Dashboard', to: '/doctor/dashboard' },
  { label: 'Help & Support', to: '/contact-us' },
];

const socials = [
  { label: 'Facebook', icon: 'f', className: 'bg-[#1877f2] text-white' },
  { label: 'Instagram', icon: 'ig', className: 'bg-[#e4405f] text-white' },
  { label: 'Twitter', icon: 't', className: 'bg-[#1da1f2] text-white' },
  { label: 'LinkedIn', icon: 'in', className: 'bg-[#0a66c2] text-white' },
];

export default function Footer() {
  const location = useLocation();
  const isPatientPath = location.pathname.startsWith('/patient');
  const contactPath = location.pathname.startsWith('/patient') ? '/patient/contact-us' : '/contact-us';
  const quickLinkPath = (path) => {
    if (path === '/dashboard') return '/patient/dashboard';
    if (path === '/find-doctor' && isPatientPath) return '/patient/find-doctor';
    return path;
  };

  return (
    <footer className="bg-[#0b3d7a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="grid gap-6 border-b border-white/20 pb-4 lg:grid-cols-[1.2fr_1fr_1fr_1.35fr] lg:gap-0">
          <div className="border-white/15 pr-6 lg:border-r">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-[#12a9ff] text-lg font-bold text-white shadow-[0_0_12px_rgba(18,169,255,0.7)]">
                +
              </span>
              <span className="text-base font-extrabold tracking-tight text-white">Mediconnect AI</span>
            </div>

            <p className="mt-4 max-w-[220px] text-xs leading-6 text-white/85">
              Your smart healthcare partner. Find, connect and book trusted doctors across Pakistan.
            </p>

            <div className="mt-3 flex gap-3">
              {socials.map(({ label, icon: Icon, className }) => (
                <a
                  key={label}
                  href="#"
                  className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition hover:brightness-110 ${className}`}
                  aria-label={label}
                >
                  {Icon}
                </a>
              ))}
            </div>
          </div>

          <div className="border-white/15 px-6 lg:border-r">
            <h3 className="mb-3 text-sm font-bold text-[#ffcf49]">Quick Links</h3>
            <ul className="space-y-2 text-xs text-white/85">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to === '/contact-us' ? contactPath : link.to} className="inline-flex items-center gap-2 transition hover:text-white">
                    <ChevronRight size={12} className="text-white/80" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-white/15 px-6 lg:border-r">
            <h3 className="mb-3 text-sm font-bold text-[#ffcf49]">For Doctors</h3>
            <ul className="space-y-2 text-xs text-white/85">
              {doctorLinks.map((link) => (
                <li key={link.label}>
                  <Link to={quickLinkPath(link.to)} className="inline-flex items-center gap-2 transition hover:text-white">
                    <ChevronRight size={12} className="text-white/80" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-6">
            <h3 className="mb-3 text-sm font-bold text-white">Watch Video</h3>

            <button className="flex w-full items-center gap-3 rounded-lg border border-white/60 bg-[#0e4d95] px-4 py-2.5 text-left transition hover:bg-[#1255a2]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#0b3d7a]">
                <Play size={17} fill="currentColor" className="ml-0.5" />
              </span>
              <span>
                <span className="block text-xs font-bold text-white">Watch Video</span>
                <span className="block text-[11px] text-white/80">Complete Overview</span>
              </span>
            </button>

            <p className="mb-1.5 mt-3 text-[11px] font-medium text-white">Say something about Mediconnect AI</p>
            <div className="flex overflow-hidden rounded-md border border-white/20 bg-white">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full border-0 bg-transparent px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none"
              />
              <button className="bg-[#2459ef] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#164fe0]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Mediconnect AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="#" className="transition hover:text-white">Privacy Policy</Link>
            <span className="text-white/40">|</span>
            <Link to="#" className="transition hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
