import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 104 }) => {
  return (
    <div className={`logo-container ${className}`}>
      <img
        src="/logo.png"
        alt="NovaCode - QR + NFC Solutions"
        width={size}
        height={size}
        className="logo-image"
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
