import React from 'react';
import PageHero from '../components/PageHero';
import ScrollFillHeading from '../components/ScrollFillHeading';
import ScrollReveal from '../components/ScrollReveal';
import { useWebsiteContent } from '../cms';

const HowItWorks = () => {
  const { content } = useWebsiteContent();
  const { howSteps, howMantra, why, heroImages } = content;

  return (
    <div className="bg-[#0a0a0a]">
      <PageHero
        eyebrow="How It Works"
        title={howMantra}
        subtitle="Simple From Requirement to Delivery."
        image={heroImages?.slides?.[3]?.src || heroImages?.background}
      />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14">
        <p className="max-w-3xl text-white/70 leading-relaxed mb-10 text-sm md:text-base">
          {why.p1} {why.p2}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {howSteps.map((step, idx) => (
            <ScrollReveal key={step.n} stagger={idx * 0.05} y={14}>
              <article className="h-full border border-white/10 bg-white/[0.03] rounded-lg p-5">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FFB400] text-black text-xs font-bold">
                  {step.n}
                </span>
                <h3 className="mt-3 text-white text-base font-semibold leading-snug">{step.title}</h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed">{step.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <ScrollFillHeading as="h2" theme="dark" className="text-xl md:text-2xl mt-10">
          {why.focus}
        </ScrollFillHeading>
      </section>
    </div>
  );
};

export default HowItWorks;
