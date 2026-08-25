import React from 'react';
import PageHero from '../components/PageHero';
import { useWebsiteContent } from '../cms';

const Privacy = () => {
  const { content } = useWebsiteContent();
  const { brand, privacy, heroImages } = content;

  return (
    <div className="bg-[#f6f6f4]">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`How ${brand.name} handles the information you share with us.`}
        image={heroImages?.background}
      />
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-14 space-y-5 text-black/70 leading-relaxed text-sm md:text-base">
        <p>{privacy?.p1}</p>
        <p>{privacy?.p2}</p>
        <p>
          For questions about this policy, write to {brand.email} or call {brand.phone}.
        </p>
      </section>
    </div>
  );
};

export default Privacy;
