import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const scrollToTop = () => {
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const ScrollToTop = () => {
  const { pathname, hash, key, search } = useLocation();
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // First paint / refresh: always start at the very top (ignore leftover hash)
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      scrollToTop();
      if (hash) {
        navigate(`${pathname}${search}`, { replace: true });
      }
      const t1 = window.setTimeout(scrollToTop, 0);
      const t2 = window.setTimeout(scrollToTop, 100);
      const t3 = window.setTimeout(scrollToTop, 350);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(t3);
      };
    }

    // Later client navigations: honor in-page hash links, otherwise top
    if (hash) {
      const id = hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -72, duration: 1.05 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
      return () => window.clearTimeout(timer);
    }

    scrollToTop();
  }, [pathname, hash, key, search, navigate]);

  return null;
};

export default ScrollToTop;
