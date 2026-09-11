import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Footer from '../components/layout/Footer';

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-sand-200 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <Button
            as={Link}
            to={isLoginPage ? '/signup' : '/login'}
            variant={isLoginPage ? 'primary' : 'outline'}
            size="lg"
          >
            {isLoginPage ? 'Sign up' : 'Login'}
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
