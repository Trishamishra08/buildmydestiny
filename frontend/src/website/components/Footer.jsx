import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPhone,
  FiMail,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import QrScanCard from './QrScanCard';
import { footerColumns as defaultFooterColumns, brand as fallbackBrand } from '../data/content';
import { useWebsiteContent } from '../cms';
import { getWhatsAppChatHref, openWhatsAppChat, normalizeWhatsAppPhone } from '../lib/whatsapp';

const Footer = () => {
  const { content } = useWebsiteContent();
  const brand = content.brand || {};
  const columns = content.footerColumns || defaultFooterColumns;
  const [qrUrl, setQrUrl] = useState('');
  const whatsappId = brand.whatsapp || fallbackBrand.whatsapp;
  const whatsappHref = getWhatsAppChatHref(whatsappId);
  const whatsappDisplay = brand.phone || fallbackBrand.phone;
  const phoneTel = `+${normalizeWhatsAppPhone(whatsappId)}`;

  const onWhatsAppClick = (e) => {
    e.preventDefault();
    openWhatsAppChat(whatsappId);
  };

  useEffect(() => {
    setQrUrl(window.location.origin);
  }, []);

  return (
    <footer className="bmd-footer">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-14">
        <div className="bmd-footer-grid">
          <div className="bmd-footer-brand">
            <Logo name={brand.name} tagline={brand.slogan || 'Construction Made Easy'} />
            <p className="mt-1.5 md:mt-2 text-[11px] md:text-[12px] font-semibold text-white/80">
              {brand.tagline || 'Building Materials. Made Simple.'}
            </p>
            <p className="mt-1 bmd-footer-blurb bmd-type-small text-white/55 max-w-xs text-[11px] md:text-[12px] leading-snug">
              {brand.footerBlurb ||
                'A simpler way to source essential construction materials for your home, project or business.'}
            </p>
            <Link to="/contact" className="bmd-footer-download">
              Start Your Requirement
              <ArrowRight size={14} />
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="bmd-footer-col">
              <h3 className="bmd-type-footer-h text-white mb-1.5 md:mb-4">{col.title}</h3>
              <ul className="space-y-1 md:space-y-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="bmd-type-body text-[11px] md:text-[13px] text-white/70 hover:text-[#FFB400] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bmd-footer-connect">
            <div className="bmd-footer-connect__info">
              <h3 className="bmd-type-footer-h text-white mb-1.5 md:mb-4">Connect With Us</h3>
              <ul className="space-y-1 md:space-y-2.5 bmd-type-body text-[11px] md:text-[13px] text-white/70">
                <li className="flex items-start gap-2">
                  <FiMail className="text-[#FFB400] shrink-0 mt-0.5" size={12} />
                  <span>{brand.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiPhone className="text-[#FFB400] shrink-0 mt-0.5" size={12} />
                  <a href={`tel:${phoneTel}`} className="hover:text-[#FFB400] transition-colors">
                    {whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <FaWhatsapp className="text-[#25D366] shrink-0 mt-0.5" size={13} />
                  <a
                    href={whatsappHref}
                    onClick={onWhatsAppClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] transition-colors"
                  >
                    WhatsApp {whatsappDisplay}
                  </a>
                </li>
              </ul>
            </div>
            <QrScanCard url={qrUrl} showCaption={false} size={72} className="bmd-footer-qr" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-2.5 md:py-4 text-center">
          <p className="bmd-type-caption text-white/35 text-[10px] md:text-[11px]">
            &copy; {new Date().getFullYear()} Build My Destiny. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
