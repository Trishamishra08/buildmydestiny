import React from 'react';

const MaterialCard = ({ image, alt, n, title, text, variant = 'light' }) => {
  const dark = variant === 'dark';

  return (
    <article
      className={`h-full overflow-hidden border transition-transform duration-300 hover:-translate-y-0.5 ${
        dark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10'
      }`}
    >
      <div className="h-[3px] bg-[#FFB400]" />
      {image ? (
        <div className="h-32 overflow-hidden bg-neutral-200">
          <img src={image} alt={alt || title} className="w-full h-full object-cover" />
        </div>
      ) : null}
      <div className="p-4">
        {n ? (
          <div className="text-[#FFB400] text-xl leading-none mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {n}
          </div>
        ) : null}
        <h3 className={`text-base mb-1.5 ${dark ? 'text-white' : 'text-black'}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${dark ? 'text-white/55' : 'text-black/55'}`}>{text}</p>
      </div>
    </article>
  );
};

export default MaterialCard;
