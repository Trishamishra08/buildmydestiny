import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { getGsap } from './lib/gsapScroll';
import './styles.css';

const WebsiteLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Build My Destiny';
    document.body.classList.add('bmd-website');
    return () => {
      document.title = previousTitle;
      document.body.classList.remove('bmd-website');
    };
  }, []);

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div className="bmd-site relative min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
