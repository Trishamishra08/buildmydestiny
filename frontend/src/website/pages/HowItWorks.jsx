import React from 'react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import { useWebsiteContent } from '../cms';

const HowItWorks = () => {
  const { content } = useWebsiteContent();
  const { howSteps, howMantra, why, heroImages } = content;

  return (
    <div className="bg-[#0b0b0b]">
      <PageHero eyebrow="How It Works" title={howMantra} subtitle={why.title} image={heroImages?.background} />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14">
        <p className="max-w-3xl text-white/70 leading-relaxed mb-10 text-sm md:text-base">{why.p1} {why.p2}</p>
        <div className="space-y-5">
          {howSteps.map((step, idx) => (
            <Reveal key={step.n} delay={idx * 0.05}>
              <div className="grid md:grid-cols-[100px_1fr] gap-5 items-start border-b border-white/10 pb-5">
                <div className="text-[#FFB400] text-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {step.n}
                </div>
                <div>
                  <ScrollFillHeading as="h2" className="text-2xl mb-1.5">{step.title}</ScrollFillHeading>
                  <p className="text-white/70 text-sm">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <ScrollFillHeading as="h2" className="text-xl md:text-2xl mt-10">{why.focus}</ScrollFillHeading>
      </section>
    </div>
  );
};

export default HowItWorks;
