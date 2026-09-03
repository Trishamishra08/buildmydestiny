import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import Logo from './Logo';
import { useWebsiteContent } from '../cms';

/** Matches reference banner nav */
const HEADER_NAV = [
  { label: 'Home', to: '/' },
  { label: 'All Materials', to: '/products' },
  { label: 'Why Build My Destiny?', to: '/#why' },
  { label: 'Become a Dealer', to: '/#dealers' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'App', to: '/#app' },
  { label: 'About Us', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

const Header = () => {
  const location = useLocation();
  const { content } = useWebsiteContent();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.hash;
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1);
    return location.pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-[80] bg-[#0a0a0a] border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 h-[64px] md:h-[70px] flex items-center justify-between gap-3">
            <Logo theme="dark" name={content.brand?.name} tagline={content.brand?.slogan || 'Construction Made Easy'} compact />

        <nav className="hidden xl:flex items-center gap-5 2xl:gap-6">
          {HEADER_NAV.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`bmd-type-nav relative transition-colors pb-0.5 ${
                  active ? 'text-white' : 'text-white/80 hover:text-[#FFB400]'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#FFB400] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bmd-type-btn hidden sm:inline-flex h-10 px-4 items-center gap-2 bg-[#FFB400] text-black rounded-md cursor-default select-none">
            <FiDownload size={14} strokeWidth={2.5} />
            Download App
          </div>
          <button
            type="button"
            className="xl:hidden p-2 text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-white/10 bg-[#0a0a0a]">
          <nav className="flex flex-col px-5 py-3 max-h-[70vh] overflow-y-auto">
            {HEADER_NAV.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`py-3 text-sm font-medium border-b border-white/8 ${
                  isActive(link.to) ? 'text-[#FFB400]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 h-11 inline-flex items-center justify-center gap-2 bg-[#FFB400] text-black text-[11px] font-bold uppercase tracking-wider rounded-md cursor-default">
              <FiDownload size={14} />
              Download App
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
