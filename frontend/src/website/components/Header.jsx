import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiChevronDown,
  FiPackage,
  FiHeadphones,
  FiGlobe,
} from 'react-icons/fi';
import Logo from './Logo';
import { navLinks } from '../data/content';
import { useWebsiteContent } from '../cms';
import { CATEGORY_NAV, getNavItemActive } from '../lib/categories';
const Header = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  const query = searchParams.get('q');
  const { content } = useWebsiteContent();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/products${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`;
  };

  return (
    <header className="sticky top-0 z-[80]">
      <div className="bg-[#0a0a0a] text-white text-[11px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-8 flex items-center justify-between">
          <span className="text-white/80 font-medium hidden sm:inline">{content.brand?.slogan}</span>
          <div className="flex items-center gap-4 md:gap-5 ml-auto">
            <Link to="/app/track-order" className="flex items-center gap-1.5 hover:text-[#FFB400] transition-colors">
              <FiPackage size={12} />
              <span className="hidden sm:inline">Track Order</span>
            </Link>
            <Link to="/dealers" className="hidden sm:flex items-center gap-1.5 hover:text-[#FFB400] transition-colors">
              <FiUser size={12} />
              Become a Dealer
            </Link>
            <Link to="/contact" className="hidden md:flex items-center gap-1.5 hover:text-[#FFB400] transition-colors">
              <FiHeadphones size={12} />
              Help &amp; Support
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#FFB400] transition-colors">
              <FiGlobe size={12} />
              <span>English</span>
              <FiChevronDown size={11} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-black/8 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-3">
          <div className="flex items-center gap-4 lg:gap-6">
            <Logo theme="light" name={content.brand?.name} tagline={content.brand?.tagline} />

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-auto">
              <div className="flex w-full border border-black/12 rounded-md overflow-hidden shadow-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for bricks, cement, AAC blocks, TMT, sand..."
                  className="flex-1 px-4 py-2.5 text-sm text-black placeholder:text-black/40 outline-none min-w-0 bg-white"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.1em] hover:bg-[#ffc433] transition-colors shrink-0"
                >
                  <FiSearch size={16} />
                  Search
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4 md:gap-6 ml-auto shrink-0">
              <div className="hidden lg:flex items-center gap-2 cursor-default select-none">
                <FiUser size={22} className="text-black shrink-0" />
                <div className="leading-tight">
                  <div className="text-[12px] font-semibold text-black">My Account</div>
                  <div className="text-[10px] text-black/50">Sign in / Register</div>
                </div>
              </div>
              <button
                type="button"
                className="md:hidden p-2 text-black"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="flex border border-black/12 rounded-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials..."
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button type="submit" className="px-4 bg-[#FFB400] text-black font-bold text-xs">
                <FiSearch size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <nav className="bg-[#0d1b2a] hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <ul className="flex items-center overflow-x-auto scrollbar-hide">
            {CATEGORY_NAV.map((link) => {
              const isMore = link.label === 'More';
              const active = getNavItemActive(link, location.pathname, categorySlug, query);
              return (
                <li key={link.label} className="shrink-0">
                  <Link
                    to={link.to}
                    className={`flex items-center gap-1 px-3 lg:px-4 py-2.5 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#FFB400] text-black'
                        : 'text-white/90 hover:text-[#FFB400]'
                    }`}
                  >
                    {link.label}
                    {isMore && <FiChevronDown size={13} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 z-[90] bg-white top-[120px]">
          <nav className="flex flex-col px-6 py-4 gap-0 overflow-y-auto max-h-[calc(100vh-120px)]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-2">Categories</p>
            {CATEGORY_NAV.filter((l) => l.label !== 'Home').map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`py-2.5 text-sm font-bold uppercase tracking-wide border-b border-black/6 ${
                  getNavItemActive(link, location.pathname, categorySlug, query)
                    ? 'text-[#FFB400]'
                    : 'text-black'
                }`}
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
            <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 mt-4 mb-2">Menu</p>
            {navLinks.filter((l) => l.label !== 'Home' && l.label !== 'Products').map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-3 text-base font-bold uppercase tracking-wide text-black border-b border-black/8"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 py-3 text-sm font-semibold text-[#FFB400]"
            >
              {content.home?.quoteCta || 'Get a Quote'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
