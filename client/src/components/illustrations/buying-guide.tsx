import React from "react";

/**
 * Ilustracja przedstawiająca postać z lupą przeglądającą ogłoszenia
 */
const BuyingGuideIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="50" fill="#E8EDFB" />
      
      {/* Magnifying glass */}
      <circle cx="65" cy="50" r="20" stroke="#5E72E4" strokeWidth="3" fill="white" />
      <line 
        x1="50" 
        y1="65" 
        x2="35" 
        y2="80" 
        stroke="#5E72E4" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      
      {/* Smiling face inside magnifying glass */}
      <circle cx="60" cy="45" r="3" fill="#5E72E4" /> {/* Left eye */}
      <circle cx="70" cy="45" r="3" fill="#5E72E4" /> {/* Right eye */}
      <path 
        d="M55 55 Q65 60 75 55" 
        stroke="#5E72E4" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none" 
      /> {/* Smile */}
      
      {/* Small icons around the glass representing products/categories */}
      <rect x="85" y="30" width="10" height="10" rx="2" fill="#FFD166" />
      <rect x="45" y="25" width="8" height="8" rx="2" fill="#06D6A0" />
      <rect x="90" y="60" width="12" height="12" rx="2" fill="#EF476F" />
      <rect x="40" y="80" width="9" height="9" rx="2" fill="#118AB2" />
    </svg>
  );
};

export default BuyingGuideIllustration;