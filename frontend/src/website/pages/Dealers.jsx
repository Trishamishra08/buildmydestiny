import React from 'react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import { DEALER_HREF } from '../data/content';
import { useWebsiteContent } from '../cms';

const Dealers = () => {
  const { content } = useWebsiteContent();
  const { dealers, heroImages } = content;

  return (
    <div className="bg-[#0b0b0b]">
      <PageHero eyebrow="Dealers" title={dealers.title} subtitle={dealers.intro} image={heroImages?.background} />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14">
        <img src={dealers.image || '/website/dealers.jpg'} alt="Dealer network" className="w-full h-52 md:h-64 object-cover mb-10" />
        <ScrollFillHeading as="h2" className="text-2xl md:text-3xl mb-6">Dealer Benefits</ScrollFillHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dealers.benefits.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.04}>
              <div className="bg-[#111111] p-5 border-t-2 border-[#FFB400] h-full hover:-translate-y-1 transition-transform">
                <h3 className="text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <a
          href={DEALER_HREF}
          className="inline-flex mt-10 h-11 px-6 items-center bg-[#FFB400] text-black text-[11px] font-extrabold uppercase tracking-[0.16em]"
        >
          {dealers.cta}
        </a>
      </section>
    </div>
  );
};

export default Dealers;
