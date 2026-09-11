import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HeroBanner = ({
  slides = [],
  delay = 2500,
  onSlideChange,
  className = '',
}) => {
  const items = slides.filter((slide) => slide?.src);
  const swiperRef = useRef(null);
  if (!items.length) return null;

  const resumeAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    swiper.autoplay.start();
  };

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={items.length > 1}
      speed={900}
      autoplay={{
        delay,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        waitForTransition: true,
      }}
      pagination={{ clickable: true }}
      observer
      observeParents
      allowTouchMove
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        swiper.autoplay?.start();
      }}
      onTouchEnd={resumeAutoplay}
      onSlideChangeTransitionEnd={resumeAutoplay}
      onSlideChange={(swiper) => {
        onSlideChange?.(swiper.realIndex);
      }}
      className={`bmd-hero-swiper ${className}`.trim()}
    >
      {items.map((slide, index) => {
        const mobileSrc = slide.mobileSrc || slide.src;
        return (
          <SwiperSlide key={slide.src + (slide.label || '')}>
            <picture>
              <source media="(max-width: 767px)" srcSet={mobileSrc} />
              <img
                src={slide.src}
                alt={slide.alt || slide.label || 'Build My Destiny banner'}
                className="bmd-hero-photo"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                fetchPriority={index === 0 ? 'high' : 'low'}
              />
            </picture>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroBanner;
