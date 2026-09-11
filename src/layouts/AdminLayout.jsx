import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Bell, ChevronDown, Menu, ShieldCheck } from 'lucide-react';
import Logo from '../components/common/Logo';
import AdminSidebar from '../components/layout/AdminSidebar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout flex min-h-screen min-w-0 flex-col overflow-x-hidden ">
      <header className="sticky top-0 z-30 flex min-w-0 items-center justify-between border-b border-sand-200 bg-white px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu" className="rounded-lg p-2 text-ink-900/65 hover:bg-sand-100 lg:hidden">
            <Menu size={20} />
          </button>
          <Logo />
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 rounded-full bg-mint-400/10 px-3 py-1.5 text-xs font-semibold text-mint-500 sm:flex">
            <ShieldCheck size={14} /> Better Healthcare for a Healthier Tomorrow
          </div>
          <button className="relative rounded-full p-2 text-ink-900/60 hover:bg-sand-100">
            <Bell size={20} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-coral-500" />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-sand-200 py-1.5 pl-1.5 pr-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-900 text-white text-xs font-bold">A</span>
            <span className="text-sm font-semibold text-ink-900">Admin</span>
            <ChevronDown size={14} className="text-ink-900/50" />
          </button>
        </div>
      </header>
      <div className="flex min-w-0 flex-1">
        <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="w-full min-w-0 flex-1 px-4 py-5 sm:px-5 sm:py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
