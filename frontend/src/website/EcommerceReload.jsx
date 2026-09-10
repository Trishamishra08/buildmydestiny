import React, { useEffect } from 'react';

const EcommerceReload = () => {
  useEffect(() => {
    window.location.reload();
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-[#FFB400] flex items-center justify-center text-sm font-semibold tracking-[0.08em] uppercase"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      Opening app…
    </div>
  );
};

export default EcommerceReload;
