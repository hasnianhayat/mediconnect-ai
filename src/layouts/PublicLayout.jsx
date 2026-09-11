import { Outlet } from 'react-router-dom';
import PublicHeader from '../components/layout/PublicHeader';
import Footer from '../components/layout/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicHeader />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
