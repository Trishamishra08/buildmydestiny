import React, { useEffect } from 'react';

const EcommerceReload = () => {
  useEffect(() => {
    window.location.reload();
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-[#FFB400] flex items-center justify-center text-sm font-bold tracking-[0.2em] uppercase"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      Opening app…
    </div>
  );
};

export default EcommerceReload;
