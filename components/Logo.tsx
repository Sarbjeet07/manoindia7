import React from 'react';

export const Logo: React.FC<{ className?: string; hideText?: boolean }> = ({ className = "w-24 h-24", hideText = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Pulse-line 'M' Shape from image */}
        <path 
          d="M 40,200 L 130,200 L 175,80 L 200,260 L 225,80 L 270,200 L 360,200" 
          stroke="url(#goldGradient)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="drop-shadow-lg"
        />
        
        {/* Human Figure above the central V */}
        <g transform="translate(0, -20)">
            {/* Figure Body (The smaller V) */}
            <path 
              d="M 175,120 L 200,160 L 225,120 L 200,140 Z" 
              fill="#fdf8e1" 
            />
            {/* Figure Head */}
            <circle cx="200" cy="110" r="10" fill="#fdf8e1" />
        </g>

        <defs>
          <linearGradient id="goldGradient" x1="40" y1="200" x2="360" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d4af37" />
            <stop offset="0.5" stopColor="#b68d4a" />
            <stop offset="1" stopColor="#8a6d3b" />
          </linearGradient>
        </defs>
      </svg>
      {!hideText && (
        <span className="mt-2 text-[#fdf8e1] font-medium text-2xl tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', serif" }}>
          ManoIndia
        </span>
      )}
    </div>
  );
};