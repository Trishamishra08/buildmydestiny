import React from 'react';
import { ChevronLeft, Search, Star, Wifi, Signal, BatteryMedium } from 'lucide-react';

const PlayStorePhoneMockup = ({
  appName = 'Build My Destiny',
  developer = 'Build My Destiny',
  tagline = 'Building Materials, Building Trust.',
  screenshots = [],
  comingSoon = 'Coming Soon',
}) => {
  const shots =
    screenshots.length > 0
      ? screenshots
      : ['/website/material-cement.jpg', '/website/material-bricks.jpg', '/website/material-steel.jpg'];

  return (
    <div className="relative mx-auto w-[11.5rem] sm:w-[12.5rem] md:w-[13.5rem]">
      <div className="bmd-phone-frame rounded-[1.85rem] bg-[#1a1a1a] p-[7px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/20">
        <div className="rounded-[1.45rem] overflow-hidden bg-white aspect-[9/19.5] flex flex-col">
          {/* Status bar */}
          <div className="shrink-0 relative flex items-center justify-between px-3 pt-2 pb-0.5 bg-white text-[7px] font-semibold text-black/80">
            <span>9:41</span>
            <div className="w-14 h-3.5 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-1.5" aria-hidden="true" />
            <div className="flex items-center gap-0.5">
              <Signal size={8} strokeWidth={2.5} />
              <Wifi size={8} strokeWidth={2.5} />
              <BatteryMedium size={9} strokeWidth={2.5} />
            </div>
          </div>

          {/* Play Store screen */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bmd-play-store-scroll bg-[#fafafa]">
            {/* Play Store top bar */}
            <div className="sticky top-0 z-10 flex items-center gap-1.5 px-2 py-1.5 bg-white border-b border-black/5">
              <ChevronLeft size={12} className="text-black/60 shrink-0" />
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                  <path
                    fill="#01875f"
                    d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z"
                  />
                  <path fill="#4285F4" d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" />
                  <path fill="#34A853" d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81Z" />
                  <path fill="#FBBC04" d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                </svg>
                <span className="text-[8px] font-medium text-black/70 truncate">Google Play</span>
              </div>
              <Search size={11} className="text-black/50 shrink-0" />
            </div>

            {/* App listing header */}
            <div className="px-2.5 pt-2.5 pb-2 bg-white">
              <div className="flex gap-2">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0d1b2a] flex items-center justify-center shadow-sm overflow-hidden">
                  <svg viewBox="0 0 52 52" className="w-7 h-7" aria-hidden="true">
                    <rect x="4" y="20" width="12" height="28" fill="#FFB400" />
                    <rect x="20" y="6" width="12" height="42" fill="#FFB400" />
                    <rect x="36" y="26" width="12" height="22" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h4 className="text-[9px] font-bold text-black leading-tight truncate">{appName}</h4>
                  <p className="text-[7px] text-[#01875f] font-medium truncate mt-0.5">{developer}</p>
                  <p className="text-[6px] text-black/45 mt-0.5">Shopping · Materials</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 text-[7px] text-black/55">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-0.5 text-black font-bold text-[8px]">
                    4.8 <Star size={7} className="fill-[#FFB400] text-[#FFB400]" />
                  </div>
                  <span>12K reviews</span>
                </div>
                <div className="w-px h-5 bg-black/10" />
                <div className="text-center">
                  <div className="font-bold text-[8px] text-black">50K+</div>
                  <span>Downloads</span>
                </div>
                <div className="w-px h-5 bg-black/10" />
                <div className="text-center">
                  <div className="font-bold text-[8px] text-black">3+</div>
                  <span>Rated for 3+</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-2.5 w-full h-7 rounded-md bg-[#01875f] text-white text-[8px] font-bold uppercase tracking-wide cursor-default"
              >
                Install
              </button>
              <p className="text-center text-[6px] text-[#FFB400] font-bold uppercase tracking-wider mt-1.5">
                {comingSoon}
              </p>
            </div>

            {/* Screenshots */}
            <div className="px-2.5 py-2 bg-white border-t border-black/5">
              <div className="flex gap-1.5 overflow-x-auto bmd-play-store-scroll pb-0.5">
                {shots.slice(0, 4).map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="shrink-0 w-[4.5rem] h-[8rem] rounded-md overflow-hidden border border-black/8 bg-neutral-100"
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="px-2.5 py-2 bg-white border-t border-black/5">
              <h5 className="text-[8px] font-bold text-black mb-1">About this app</h5>
              <p className="text-[7px] text-black/55 leading-relaxed line-clamp-4">{tagline}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {['Materials', 'Dealers', 'Delivery'].map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 rounded-full bg-black/5 text-[6px] text-black/50 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Data safety snippet */}
            <div className="px-2.5 py-2 mb-2 bg-white border-t border-black/5">
              <h5 className="text-[8px] font-bold text-black mb-1">Data safety</h5>
              <p className="text-[6px] text-black/45 leading-relaxed">
                Safety starts with understanding how developers collect and share your data.
              </p>
            </div>
          </div>

          {/* Home indicator */}
          <div className="shrink-0 py-1.5 bg-white flex justify-center">
            <div className="w-16 h-1 rounded-full bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayStorePhoneMockup;
