import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import { useWebsiteContent } from '../cms';

const Faq = () => {
  const { content } = useWebsiteContent();
  const { faqs, faqPage, heroImages } = content;
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-[#0b0b0b]">
      <PageHero
        eyebrow="FAQ"
        title={faqPage?.title || 'Questions, answered.'}
        subtitle={faqPage?.subtitle}
        image={heroImages?.background}
      />
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-14 space-y-3">
        {faqs.map((item, idx) => {
          const active = open === idx;
          return (
            <article key={`${item.q}-${idx}`} className="border border-white/10 bg-black">
              <button
                type="button"
                onClick={() => setOpen(active ? -1 : idx)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-white font-semibold">{item.q}</span>
                <FiChevronDown className={`text-[#FFB400] transition-transform ${active ? 'rotate-180' : ''}`} />
              </button>
              {active && <p className="px-5 pb-5 text-white/70 text-sm leading-relaxed">{item.a}</p>}
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Faq;
