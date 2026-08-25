import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import { navLinks } from '../data/content';
import { useWebsiteContent } from '../cms';

const Header = () => {
  const location = useLocation();
  const { content } = useWebsiteContent();
  const isHome = location.pathname === '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const floating = isHome && !scrolled;
  const headerClass = floating
    ? 'fixed top-0 left-0 right-0 bg-transparent'
    : 'fixed top-0 left-0 right-0 bg-[#111111]/95 backdrop-blur-md border-b border-white/5';

  return (
    <header className={`${headerClass} z-[80]`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-[72px] md:h-[78px] flex items-center justify-between gap-6">
        <Logo name={content.brand?.name} tagline={content.brand?.tagline} />

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active =
              link.to === '/'
                ? location.pathname === '/'
                : location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  active ? 'text-white border border-white' : 'text-white/75 hover:text-white border border-transparent'
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

        <button
          type="button"
          className="lg:hidden text-white p-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-[#0b0b0b]">
          <div className="flex items-center justify-between px-4 h-[72px] border-b border-white/10">
            <Logo name={content.brand?.name} tagline={content.brand?.tagline} />
            <button type="button" className="text-white p-2" onClick={() => setOpen(false)} aria-label="Close menu">
              <FiX size={24} />
            </button>
          </div>
          <nav className="flex flex-col px-8 py-8 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white text-2xl font-bold uppercase tracking-[0.12em]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
