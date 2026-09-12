import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../components/layout/DashboardHeader';
import AdminSidebar from '../components/layout/AdminSidebar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout flex min-h-screen min-w-0 flex-col overflow-x-hidden">
      <DashboardHeader role="Admin" notifications={3} onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex min-w-0 flex-1">
        <AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="w-full min-w-0 flex-1 px-4 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
