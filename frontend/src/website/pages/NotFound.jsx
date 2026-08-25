import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';

const NotFound = () => {
  const location = useLocation();
  return (
    <div className="bg-[#0b0b0b]">
      <PageHero eyebrow="404" title="Page not found" subtitle={`No page exists at ${location.pathname}.`} />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        <Link to="/" className="inline-flex h-12 px-7 items-center bg-[#FFB400] text-black text-[12px] font-extrabold uppercase tracking-[0.16em]">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
