import React from 'react';

export const cardTone = (idx) => {
  const tones = ['white', 'yellow', 'black'];
  return tones[idx % tones.length];
};

const MaterialCard = ({ image, alt, n, title, text, tone = 'white' }) => {
  const styles = {
    white: {
      wrap: 'bg-white text-black border-[#FFB400]',
      n: 'text-[#FFB400]',
      bar: 'bg-[#FFB400]',
      body: 'text-black/60',
    },
    yellow: {
      wrap: 'bg-[#FFB400] text-black border-black',
      n: 'text-black',
      bar: 'bg-black',
      body: 'text-black/75',
    },
    black: {
      wrap: 'bg-black text-white border-[#FFB400]',
      n: 'text-[#FFB400]',
      bar: 'bg-[#FFB400]',
      body: 'text-white/70',
    },
  }[tone] || {
    wrap: 'bg-white text-black border-[#FFB400]',
    n: 'text-[#FFB400]',
    bar: 'bg-[#FFB400]',
    body: 'text-black/60',
  };

  return (
    <article
      className={`h-full overflow-hidden border-2 shadow-sm hover:-translate-y-1 transition-transform duration-300 ${styles.wrap}`}
    >
      {image ? (
        <div className="h-28 overflow-hidden bg-[#111]">
          <img src={image} alt={alt || title} className="w-full h-full object-cover" />
        </div>
      ) : null}
      <div className="p-4">
        {n ? (
          <div
            className={`text-2xl leading-none mb-2 ${styles.n}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {n}
          </div>
        ) : (
          <div className={`w-8 h-[3px] mb-3 ${styles.bar}`} />
        )}
        <h3 className="text-inherit text-lg mb-1.5">{title}</h3>
        <p className={`text-sm leading-relaxed ${styles.body}`}>{text}</p>
      </div>
    </article>
  );
};

export default MaterialCard;
