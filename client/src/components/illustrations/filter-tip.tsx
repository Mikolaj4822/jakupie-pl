import React from "react";

/**
 * Ilustracja przedstawiająca postać korzystającą z filtrów
 */
const FilterTipIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
    >
      {/* Background */}
      <circle cx="60" cy="60" r="50" fill="#F0F7FF" />
      
      {/* Filter icon */}
      <rect x="35" y="30" width="50" height="60" rx="4" fill="white" stroke="#6C63FF" strokeWidth="2" />
      
      {/* Filter bars */}
      <rect x="45" y="40" width="30" height="6" rx="3" fill="#6C63FF" />
      <rect x="45" y="52" width="20" height="6" rx="3" fill="#6C63FF" />
      <rect x="45" y="64" width="25" height="6" rx="3" fill="#6C63FF" />
      <rect x="45" y="76" width="15" height="6" rx="3" fill="#6C63FF" />
      
      {/* Adjustment sliders */}
      <circle cx="82" y="40" r="3" fill="#FF6B6B" stroke="white" strokeWidth="1" />
      <circle cx="72" y="52" r="3" fill="#FF6B6B" stroke="white" strokeWidth="1" />
      <circle cx="77" y="64" r="3" fill="#FF6B6B" stroke="white" strokeWidth="1" />
      <circle cx="67" y="76" r="3" fill="#FF6B6B" stroke="white" strokeWidth="1" />
      
      {/* Slider lines */}
      <line x1="45" y1="40" x2="82" y2="40" stroke="#E1E8F5" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="52" x2="72" y2="52" stroke="#E1E8F5" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="64" x2="77" y2="64" stroke="#E1E8F5" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="76" x2="67" y2="76" stroke="#E1E8F5" strokeWidth="2" strokeLinecap="round" />
      
      {/* Cursor/hand */}
      <path 
        d="M90 55 L85 50 L85 57 L90 55Z" 
        fill="#FF9F43" 
        stroke="#FF9F43"
        strokeWidth="1" 
      />
      <line 
        x1="82" 
        y1="40" 
        x2="85" 
        y2="52" 
        stroke="#FF9F43" 
        strokeWidth="2" 
        strokeDasharray="2 2" 
      />
    </svg>
  );
};

export default FilterTipIllustration;