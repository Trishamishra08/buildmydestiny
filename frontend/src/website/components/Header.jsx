import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '../data/content';
import { useWebsiteContent } from '../cms';

const Header = () => {
  const location = useLocation();
  const { content } = useWebsiteContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';
  const dark = isHome;
  const quoteLabel = content.home?.quoteCta || 'Get a Quote';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const headerClass = dark
    ? scrolled
      ? 'fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10'
      : 'fixed top-0 left-0 right-0 bg-transparent'
    : scrolled
      ? 'fixed top-0 left-0 right-0 bg-white/96 backdrop-blur-md border-b border-black/10 shadow-sm'
      : 'fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-black/5';

  const linkIdle = dark ? 'text-white/80 hover:text-white' : 'text-black/60 hover:text-black';
  const linkActive = dark ? 'text-white' : 'text-black';
  const menuIcon = dark ? 'text-white' : 'text-black';

  return (
    <header className={`${headerClass} z-[80]`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-[72px] md:h-[78px] grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
        <Logo theme={dark ? 'dark' : 'light'} name={content.brand?.name} tagline={content.brand?.tagline} />

        <nav className="hidden lg:flex items-center justify-center gap-8">
          {navLinks.map((link) => {
            const active =
              link.to === '/'
                ? location.pathname === '/'
                : location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  active ? linkActive : linkIdle
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-[2px] bg-[#FFB400]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link
            to="/contact"
            className={`hidden lg:inline-flex items-center gap-2 h-10 px-4 border border-[#FFB400] text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
              dark ? 'text-white hover:bg-[#FFB400] hover:text-black' : 'text-black hover:bg-[#FFB400]'
            }`}
          >
            {quoteLabel}
            <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            className={`lg:hidden p-2 ${menuIcon}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`lg:hidden fixed inset-0 z-[60] ${dark ? 'bg-black' : 'bg-white'}`}>
          <div className={`flex items-center justify-between px-4 h-[72px] border-b ${dark ? 'border-white/10' : 'border-black/10'}`}>
            <Logo theme={dark ? 'dark' : 'light'} name={content.brand?.name} tagline={content.brand?.tagline} />
            <button type="button" className={`p-2 ${menuIcon}`} onClick={() => setOpen(false)} aria-label="Close menu">
              <FiX size={24} />
            </button>
          </div>
          <nav className="flex flex-col px-8 py-8 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-2xl font-bold uppercase tracking-[0.12em] ${dark ? 'text-white' : 'text-black'}`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 inline-flex w-fit items-center gap-2 h-11 px-5 border border-[#FFB400] text-[#FFB400] text-[11px] font-bold uppercase tracking-[0.16em]"
            >
              {quoteLabel}
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
