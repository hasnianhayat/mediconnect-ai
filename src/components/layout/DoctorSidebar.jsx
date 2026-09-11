import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarClock, CalendarCheck, Users, FileText, Bot, MessageSquare, User, LogOut, X } from 'lucide-react';

const links = [
  { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/doctor/schedule', label: 'Schedule Manager', icon: CalendarClock },
  { to: '/doctor/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/doctor/patients', label: 'Patients / Queue', icon: Users },
  { to: '/doctor/reports', label: 'Reports', icon: FileText },
  { to: '/doctor/ai-assistant', label: 'AI Assistant', icon: Bot },
  { to: '/doctor/feedback', label: 'Patient Feedback', icon: MessageSquare },
  { to: '/doctor/profile', label: 'Account Settings', icon: User },
];

export default function DoctorSidebar({ mobileOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const handleNavigate = () => onClose();

  const navigation = (
    <>
      <p className="mb-3 px-4 text-xs font-bold uppercase tracking-wide text-ink-900/35">Main Menu</p>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} onClick={handleNavigate} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <l.icon size={18} />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={() => { onClose(); navigate('/login'); }} className="sidebar-link text-coral-500 hover:bg-coral-500/5 hover:text-coral-500">
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sand-200 bg-white px-4 py-6 lg:flex">{navigation}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close navigation menu" onClick={onClose} className="absolute inset-0 bg-ink-950/30" />
          <aside className="relative flex h-full w-72 max-w-[86vw] flex-col border-r border-sand-200 bg-white px-4 py-5 shadow-xl">
            <button type="button" aria-label="Close navigation menu" onClick={onClose} className="mb-4 ml-auto rounded-lg p-2 text-ink-900/60 hover:bg-sand-100">
              <X size={20} />
            </button>
            {navigation}
          </aside>
        </div>
      )}
    </>
  );
}
