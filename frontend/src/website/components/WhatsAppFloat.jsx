import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { brand as fallbackBrand } from '../data/content';
import { useWebsiteContent } from '../cms';
import { getWhatsAppChatHref, openWhatsAppChat } from '../lib/whatsapp';

const WhatsAppFloat = () => {
  const { content } = useWebsiteContent();
  const whatsapp = content.brand?.whatsapp || fallbackBrand.whatsapp;
  const href = getWhatsAppChatHref(whatsapp);

  const onClick = (e) => {
    e.preventDefault();
    openWhatsAppChat(whatsapp);
  };

  return (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className="bmd-whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
};

export default WhatsAppFloat;
