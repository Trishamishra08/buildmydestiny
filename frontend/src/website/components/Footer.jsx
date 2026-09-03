import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPhone,
  FiMail,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
} from 'react-icons/fi';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import QrScanCard from './QrScanCard';
import { footerColumns as defaultFooterColumns } from '../data/content';
import { useWebsiteContent } from '../cms';

const Footer = () => {
  const { content } = useWebsiteContent();
  const brand = content.brand || {};
  const columns = content.footerColumns || defaultFooterColumns;
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    setQrUrl(window.location.origin);
  }, []);

  return (
    <footer className="bmd-footer">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-14">
        <div className="bmd-footer-grid">
          <div className="bmd-footer-brand">
            <Logo name={brand.name} tagline={brand.slogan || 'Construction Made Easy'} />
            <p className="mt-3 text-[12px] font-semibold text-white/80">
              {brand.tagline || 'Building Materials. Made Simple.'}
            </p>
            <p className="mt-2 bmd-type-small text-white/55 max-w-xs">
              {brand.footerBlurb ||
                'A simpler way to source essential construction materials for your home, project or business.'}
            </p>
            <Link to="/contact" className="bmd-footer-download">
              Start Your Requirement
              <ArrowRight size={14} />
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="bmd-type-footer-h text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="bmd-type-body text-white/70 hover:text-[#FFB400] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bmd-footer-connect">
            <div>
              <h3 className="bmd-type-footer-h text-white mb-4">Connect With Us</h3>
              <ul className="space-y-2.5 bmd-type-body text-white/70">
                <li className="flex items-center gap-2">
                  <FiMail className="text-[#FFB400] shrink-0" size={13} />
                  {brand.email}
                </li>
                <li className="flex items-center gap-2">
                  <FiPhone className="text-[#FFB400] shrink-0" size={13} />
                  {brand.phone}
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-2.5">
                {[FiFacebook, FiInstagram, FiLinkedin, FiYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-[#FFB400] hover:text-[#FFB400] transition-colors"
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
            <QrScanCard url={qrUrl} showCaption={false} size={132} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 text-center">
          <p className="bmd-type-caption text-white/35">
            &copy; {new Date().getFullYear()} Build My Destiny. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
