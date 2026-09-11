import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import DashboardHeader from '../components/layout/DashboardHeader';
import PatientSidebar from '../components/layout/PatientSidebar';
import Footer from '../components/layout/Footer';

export default function PatientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden">
      <DashboardHeader role="Patient" onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex min-w-0 flex-1">
        <PatientSidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
        <main className="w-full min-w-0 flex-1 px-4 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-6">
          {children || <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
}
