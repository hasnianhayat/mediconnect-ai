import { useState } from 'react';
import { Bell, ChevronDown, LogOut, Menu, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';

export default function DashboardHeader({ role = 'Patient', notifications = 3, onMenuClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const profilePath = role === 'Doctor' ? '/doctor/profile' : '/patient/profile';

  return (
    <header className="sticky top-0 z-30 flex min-w-0 items-center justify-between border-b border-sand-200 bg-white/90 px-3 py-3 backdrop-blur sm:px-5 sm:py-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-2">
        {onMenuClick && (
          <button type="button" onClick={onMenuClick} aria-label="Open navigation menu" className="rounded-lg p-2 text-ink-900/65 hover:bg-sand-100 lg:hidden">
            <Menu size={20} />
          </button>
        )}
        <Logo />
      </div>
      <div className="flex min-w-0 items-center gap-2 sm:gap-5">
        <button aria-label="Notifications" className="relative rounded-full p-2 text-ink-900/60 hover:bg-sand-100">
          <Bell size={18} className="sm:h-5 sm:w-5" />
          {notifications > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-coral-500 text-[10px] font-bold text-white">
              {notifications}
            </span>
          )}
        </button>
        {/* <button type="button" aria-label={`Open ${role} account settings`} onClick={() => navigate(profilePath)} className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-600 transition hover:bg-brand-200">
          <User size={16} />
        </button> */}
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 rounded-full border border-sand-200 py-1 pl-1 pr-2 hover:bg-sand-50 sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-brand-600">
              <User size={14} />
            </span>
            <span className="hidden text-xs font-semibold text-ink-900 sm:inline">{role}</span>
            <ChevronDown size={14} className="text-ink-900/50" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-sand-200 bg-white py-1.5 shadow-card">
              <button onClick={() => { setOpen(false); navigate(profilePath); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink-900/70 hover:bg-sand-50">
                <Settings size={15} /> Settings
              </button>
              <button onClick={() => { localStorage.removeItem('mediconnect-session'); navigate('/login'); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-coral-500 hover:bg-coral-500/5">
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
