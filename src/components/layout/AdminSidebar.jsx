import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Users, CalendarCheck, Clock, MessageCircleWarning, FileBarChart, Settings, LogOut, X } from 'lucide-react';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/manage-doctors', label: 'Manage Doctors', icon: Stethoscope },
  { to: '/admin/manage-patients', label: 'Manage Patients', icon: Users },
  { to: '/admin/manage-appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin/pending-doctors', label: 'Doctor Pending Queue', icon: Clock },
  { to: '/admin/complaints', label: 'Open Complaints', icon: MessageCircleWarning },
  { to: '/admin/reports', label: 'Reports', icon: FileBarChart },
  { to: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export default function AdminSidebar({ mobileOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const navigation = (
    <>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <l.icon size={18} />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={() => { onClose(); navigate('/admin/login'); }} className="sidebar-link text-coral-500 hover:bg-coral-500/5 hover:text-coral-500">
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
