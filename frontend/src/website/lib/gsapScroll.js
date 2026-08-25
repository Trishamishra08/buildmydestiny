import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export const getGsap = () => {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
};

export const bindLenisToGsap = (lenis) => {
  const { gsap: g, ScrollTrigger: ST } = getGsap();

  const onScroll = () => {
    ST.update();
    window.dispatchEvent(new Event('scroll'));
  };
  lenis.on('scroll', onScroll);

  const ticker = (time) => {
    lenis.raf(time * 1000);
  };
  g.ticker.add(ticker);
  g.ticker.lagSmoothing(0);
  ST.refresh();

  return () => {
    lenis.off('scroll', onScroll);
    g.ticker.remove(ticker);
  };
};
