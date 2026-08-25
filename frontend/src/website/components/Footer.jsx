import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiChevronRight } from 'react-icons/fi';
import Logo from './Logo';
import HazardStripe from './HazardStripe';
import { footerLinks } from '../data/content';
import { useWebsiteContent } from '../cms';

const Footer = () => {
  const { content } = useWebsiteContent();
  const brand = content.brand || {};

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <Logo name={brand.name} tagline={brand.tagline} />
          <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">{brand.slogan}</p>
        </div>

        <div>
          <h3 className="text-[#FFB400] text-sm font-bold tracking-[0.2em] mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className="flex items-center gap-2 text-[13px] text-white/80 hover:text-[#FFB400] transition-colors"
              >
                <FiChevronRight className="text-[#FFB400] shrink-0" size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[#FFB400] text-sm font-bold tracking-[0.2em] mb-4">Contact Us</h3>
          <ul className="space-y-3 text-[13px] text-white/85">
            <li className="flex items-center gap-3">
              <FiPhone className="text-[#FFB400]" /> {brand.phone}
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="text-[#FFB400]" /> {brand.email}
            </li>
            <li className="flex items-center gap-3">
              <FiGlobe className="text-[#FFB400]" /> {brand.web}
            </li>
            <li className="flex items-center gap-3">
              <FiMapPin className="text-[#FFB400]" /> {brand.location}
            </li>
          </ul>
        </div>
      </div>
      <HazardStripe className="h-4 md:h-5 bmd-hazard-animated" />
    </footer>
  );
};

export default Footer;
