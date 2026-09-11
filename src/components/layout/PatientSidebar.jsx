import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Search, Bot, FileText, HelpCircle, LogOut, X } from 'lucide-react';

const links = [
  { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/patient/appointments', label: 'My Appointments', icon: CalendarCheck },
  { to: '/patient/find-doctor', label: 'Find Doctor', icon: Search },
  { to: '/patient/ai-assistant', label: 'AI Assistant', icon: Bot },
  { to: '/patient/reports', label: 'My Reports', icon: FileText },
  { to: '/patient/help-support', label: 'Help & Support', icon: HelpCircle },
];

export default function PatientSidebar({ mobileOpen = false, onMobileClose = () => {} }) {
  const navigate = useNavigate();
  const handleNavigate = () => onMobileClose();

  const navigation = (
    <>
      <div className="mb-3 flex items-center justify-between px-4 lg:block">
        <p className="text-xs font-bold uppercase tracking-wide text-ink-900/35">Main Menu</p>
        <button type="button" onClick={onMobileClose} aria-label="Close navigation menu" className="rounded-lg p-1 text-ink-900/60 hover:bg-sand-100 lg:hidden">
          <X size={18} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} onClick={handleNavigate} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <l.icon size={18} />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={() => { onMobileClose(); localStorage.removeItem('mediconnect-session'); navigate('/login'); }} className="sidebar-link text-coral-500 hover:bg-coral-500/5 hover:text-coral-500">
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sand-200 bg-white px-4 py-6 lg:flex">
        {navigation}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close navigation menu" onClick={onMobileClose} className="absolute inset-0 bg-ink-950/35" />
          <aside className="relative flex h-full w-[min(82vw,280px)] flex-col bg-white px-4 py-6 shadow-pop">
            {navigation}
          </aside>
        </div>
      )}
    </>
  );
}
