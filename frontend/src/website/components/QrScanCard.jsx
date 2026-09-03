import React from 'react';

const QrScanCard = ({
  url = '',
  caption = 'Scan to Download the App',
  showCaption = true,
  size = 148,
}) => {
  const src = url
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=6&data=${encodeURIComponent(url)}`
    : '';

  return (
    <div className="bmd-qr-scan">
      <div className="bmd-qr-scan__frame" style={{ width: size + 20, height: size + 20 }}>
        <span className="bmd-qr-scan__corner bmd-qr-scan__corner--tl" aria-hidden="true" />
        <span className="bmd-qr-scan__corner bmd-qr-scan__corner--tr" aria-hidden="true" />
        <span className="bmd-qr-scan__corner bmd-qr-scan__corner--bl" aria-hidden="true" />
        <span className="bmd-qr-scan__corner bmd-qr-scan__corner--br" aria-hidden="true" />

        <div className="bmd-qr-scan__viewport">
          {src ? (
            <img
              src={src}
              alt="Scan to download the Build My Destiny app"
              width={size}
              height={size}
            />
          ) : (
            <div className="bmd-qr-scan__placeholder" style={{ width: size, height: size }} />
          )}
          <span className="bmd-qr-scan__laser" aria-hidden="true" />
          <span className="bmd-qr-scan__glow" aria-hidden="true" />
        </div>
      </div>
      {showCaption ? <p className="bmd-qr-scan__caption">{caption}</p> : null}
    </div>
  );
};

export default QrScanCard;
