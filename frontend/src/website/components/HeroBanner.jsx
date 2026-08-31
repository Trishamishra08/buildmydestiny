import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HeroBanner = ({ slides = [], minimal = false }) => {
  const items = slides.filter((slide) => slide?.src);
  if (!items.length) return null;

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={items.length > 1}
      speed={900}
      autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={minimal ? false : { clickable: true }}
      observer
      observeParents
      className="bmd-hero-swiper"
    >
      {items.map((slide) => (
        <SwiperSlide key={slide.src + (slide.label || '')}>
          <img src={slide.src} alt={slide.alt || slide.label || 'Building material'} />
          {!minimal && slide.label ? (
            <span className="bmd-hero-label">
              {slide.label}
            </span>
          ) : null}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroBanner;
