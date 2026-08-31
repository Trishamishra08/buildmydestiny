import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiChevronRight,
} from 'react-icons/fi';
import { ShieldCheck, Lock, RefreshCw, Truck, Headphones } from 'lucide-react';
import Logo from './Logo';
import { footerLinks } from '../data/content';
import { useWebsiteContent } from '../cms';

const trustIcons = [ShieldCheck, Lock, RefreshCw, Truck, Headphones, ShieldCheck];

const Footer = () => {
  const { content } = useWebsiteContent();
  const brand = content.brand || {};
  const promises = content.promises || [];

  const mid = Math.ceil(footerLinks.length / 2);
  const colA = footerLinks.slice(0, mid);
  const colB = footerLinks.slice(mid);

  return (
    <footer>
      <div className="bg-white border-t border-black/8 py-6">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {promises.slice(0, 5).map((item, idx) => {
              const Icon = trustIcons[idx] || ShieldCheck;
              return (
                <div key={item.title} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[#FFB400] flex items-center justify-center">
                    <Icon className="text-[#FFB400]" size={18} />
                  </div>
                  <span className="text-black text-[11px] md:text-xs font-semibold leading-tight">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#0d1b2a] text-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Logo name={brand.name} tagline={brand.tagline} />
              <p className="mt-4 text-sm text-white/55 max-w-xs leading-relaxed">{brand.slogan}</p>
              <div className="mt-5 flex items-center gap-3">
                {[FiFacebook, FiInstagram, FiLinkedin, FiYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-[#FFB400] hover:text-[#FFB400] transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[#FFB400] text-xs font-extrabold tracking-[0.2em] uppercase mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {colA.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[13px] text-white/70 hover:text-[#FFB400] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[#FFB400] text-xs font-extrabold tracking-[0.2em] uppercase mb-4">More</h3>
              <ul className="space-y-2">
                {colB.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[13px] text-white/70 hover:text-[#FFB400] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[#FFB400] text-xs font-extrabold tracking-[0.2em] uppercase mb-4">Contact</h3>
              <ul className="space-y-2 text-[13px] text-white/70">
                <li className="flex items-center gap-2">
                  <FiPhone className="text-[#FFB400] shrink-0" size={13} />
                  {brand.phone}
                </li>
                <li className="flex items-center gap-2">
                  <FiMail className="text-[#FFB400] shrink-0" size={13} />
                  {brand.email}
                </li>
                <li className="flex items-center gap-2">
                  <FiMapPin className="text-[#FFB400] shrink-0" size={13} />
                  {brand.location}
                </li>
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold text-white/80 cursor-default select-none">
                  <FiChevronRight className="text-[#FFB400]" size={14} />
                  Download App
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 text-center">
            <p className="text-white/40 text-[11px]">
              &copy; {new Date().getFullYear()} {brand.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
