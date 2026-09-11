import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bot, CircleHelp, Home, Menu, Search, X } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';

const LINKS = [
  { to: '/', label: 'Home', icon: Home, sectionId: 'home' },
  { to: '/#how-it-works', label: 'How It Works', icon: CircleHelp, sectionId: 'how-it-works' },
  { to: '/#find-doctor', label: 'Find Doctor', icon: Search, sectionId: 'find-doctor' },
  { to: '/ai-assistant-preview', label: 'AI Assistant', icon: Bot },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `/#${sectionId}`);
  };

  const goTo = (path, sectionId = null) => {
    setOpen(false);

    if (sectionId && (location.pathname === '/' || path.startsWith('/#'))) {
      scrollToSection(sectionId);
      return;
    }

    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => {
            return (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                onClick={(e) => {
                  if (l.sectionId && (location.pathname === '/' || l.to.startsWith('/#'))) {
                    e.preventDefault();
                    goTo(l.to, l.sectionId);
                  }
                }}
                className="py-7 text-sm font-bold text-ink-900/70 transition-colors hover:text-ink-900"
              >
                {l.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" size="lg" onClick={() => goTo('/login')}>Login</Button>
          <Button variant="primary" size="44" onClick={() => goTo('/signup')}>Signup</Button>
        </div>
        <button
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-lg text-ink-900 transition-colors hover:bg-sand-100 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-sand-200 bg-white px-4 py-4 shadow-card sm:px-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => {
              const Icon = l.icon;
              return (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => {
                    if (l.sectionId && (location.pathname === '/' || l.to.startsWith('/#'))) {
                      goTo(l.to, l.sectionId);
                      return;
                    }
                    goTo(l.to);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold text-ink-900/75 hover:bg-sand-50"
                >
                  <Icon size={18} strokeWidth={2.25} />
                  {l.label}
                </button>
              );
            })}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => goTo('/login')} className="w-full">Login</Button>
              <Button variant="primary" size="sm" onClick={() => goTo('/signup')} className="w-full">Signup</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
