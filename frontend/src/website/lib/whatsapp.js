const DEFAULT_MESSAGE =
  'Hi Build My Destiny, I would like to enquire about construction materials.';

/** Normalize to international digits, e.g. 918826070700 */
export const normalizeWhatsAppPhone = (value, fallback = '918826070700') => {
  let digits = String(value || fallback).replace(/\D/g, '');
  if (!digits) digits = fallback.replace(/\D/g, '');
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
};

export const getWhatsAppMessage = (message = DEFAULT_MESSAGE) =>
  encodeURIComponent(message);

/** Mobile app deep link — opens chat directly in WhatsApp app */
export const getWhatsAppAppHref = (phone, message = DEFAULT_MESSAGE) => {
  const p = normalizeWhatsAppPhone(phone);
  return `whatsapp://send?phone=${p}&text=${getWhatsAppMessage(message)}`;
};

/**
 * Direct chat URL (skips “Share on WhatsApp” interstitial).
 * - Mobile: wa.me opens the app chat
 * - Desktop: web.whatsapp.com opens the chat thread
 */
export const getWhatsAppChatHref = (phone, message = DEFAULT_MESSAGE) => {
  const p = normalizeWhatsAppPhone(phone);
  const text = getWhatsAppMessage(message);
  if (typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
    return `https://wa.me/${p}?text=${text}`;
  }
  return `https://web.whatsapp.com/send?phone=${p}&text=${text}`;
};

/** Open WhatsApp chat as directly as the platform allows */
export const openWhatsAppChat = (phone, message = DEFAULT_MESSAGE) => {
  const p = normalizeWhatsAppPhone(phone);
  const text = getWhatsAppMessage(message);
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile) {
    // Try native app first, then wa.me fallback
    const appHref = `whatsapp://send?phone=${p}&text=${text}`;
    const webHref = `https://wa.me/${p}?text=${text}`;
    window.location.href = appHref;
    window.setTimeout(() => {
      window.location.href = webHref;
    }, 600);
    return;
  }

  // Desktop → WhatsApp Web chat directly (no share landing page)
  window.open(`https://web.whatsapp.com/send?phone=${p}&text=${text}`, '_blank', 'noopener,noreferrer');
};
