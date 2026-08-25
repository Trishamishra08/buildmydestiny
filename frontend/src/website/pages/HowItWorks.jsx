import React from 'react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import ScrollFillHeading from '../components/ScrollFillHeading';
import MaterialCard from '../components/MaterialCard';
import { useWebsiteContent } from '../cms';

const HowItWorks = () => {
  const { content } = useWebsiteContent();
  const { howSteps, howMantra, why, heroImages } = content;

  return (
    <div className="bg-black">
      <PageHero eyebrow="How It Works" title={howMantra} subtitle={why.title} image={heroImages?.slides?.[3]?.src || heroImages?.background} />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14">
        <p className="max-w-3xl text-white/70 leading-relaxed mb-10 text-sm md:text-base">{why.p1} {why.p2}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {howSteps.map((step, idx) => (
            <Reveal key={step.n} delay={idx * 0.05}>
              <MaterialCard
                image={step.image}
                alt={step.title}
                n={step.n}
                title={step.title}
                text={step.text}
                variant="dark"
              />
            </Reveal>
          ))}
        </div>
        <ScrollFillHeading as="h2" theme="dark" className="text-xl md:text-2xl mt-10">{why.focus}</ScrollFillHeading>
      </section>
    </div>
  );
};

export default HowItWorks;
