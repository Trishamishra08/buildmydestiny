import React from 'react';
import { Link } from 'react-router-dom';
import { brand as fallbackBrand } from '../data/content';

const Logo = ({ compact = false, to = '/', theme = 'dark', tagline, name }) => {
  const light = theme === 'light';
  const nameColor = light ? 'text-black' : 'text-white';
  const tagColor = light ? 'text-black/55' : 'text-white/70';
  const words = String(name || fallbackBrand.name || 'BUILD MY DESTINY')
    .trim()
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean);
  const last = words.pop();

  return (
    <Link to={to} className="flex items-center gap-3 min-w-0 group">
      <svg viewBox="0 0 52 52" className="w-10 h-10 md:w-11 md:h-11 shrink-0" aria-hidden="true">
        <rect x="4" y="20" width="12" height="28" fill="#FFB400" />
        <rect x="20" y="6" width="12" height="42" fill="#FFB400" />
        <rect x="36" y="26" width="12" height="22" fill={light ? '#111111' : '#FFFFFF'} />
      </svg>
      <div className="min-w-0 leading-none">
        <div
          className={`text-[17px] md:text-[20px] font-extrabold tracking-[0.04em] ${nameColor}`}
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {words.join(' ')}{words.length ? ' ' : ''}
          <span className="text-[#FFB400]">{last}</span>
        </div>
        {!compact && (
          <div className={`mt-1 text-[8px] md:text-[9px] font-semibold uppercase tracking-[0.2em] ${tagColor}`}>
            {tagline || fallbackBrand.tagline}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
