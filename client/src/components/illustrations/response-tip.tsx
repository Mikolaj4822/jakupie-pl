import React from "react";

/**
 * Ilustracja przedstawiająca wiadomości i odpowiedzi na ogłoszenia
 */
const ResponseTipIllustration: React.FC<{ className?: string }> = ({ className }) => {
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
      <circle cx="60" cy="60" r="50" fill="#F0FFF4" />
      
      {/* Message bubbles */}
      {/* Left bubble */}
      <rect 
        x="20" 
        y="40" 
        width="35" 
        height="25" 
        rx="10" 
        fill="#E2F8EE" 
        stroke="#38B2AC" 
        strokeWidth="1.5" 
      />
      <path 
        d="M20 50 L15 60 L20 55" 
        fill="#E2F8EE" 
        stroke="#38B2AC" 
        strokeWidth="1.5" 
      />
      
      {/* Right bubble */}
      <rect 
        x="65" 
        y="35" 
        width="35" 
        height="25" 
        rx="10" 
        fill="#38B2AC" 
        stroke="#38B2AC" 
        strokeWidth="1.5" 
      />
      <path 
        d="M100 45 L105 55 L100 50" 
        fill="#38B2AC" 
        stroke="#38B2AC" 
        strokeWidth="1.5" 
      />
      
      {/* Message content lines */}
      <line x1="25" y1="45" x2="50" y2="45" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="50" x2="45" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="55" x2="40" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
      
      <line x1="70" y1="40" x2="95" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="45" x2="90" y2="45" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="50" x2="85" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
      
      {/* Bottom message with checkmark/approval */}
      <rect 
        x="40" 
        y="70" 
        width="40" 
        height="30" 
        rx="10" 
        fill="#C6F6D5" 
        stroke="#48BB78" 
        strokeWidth="1.5" 
      />
      
      <circle cx="60" cy="85" r="10" fill="#48BB78" />
      <path 
        d="M55 85 L58 88 L65 81" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ResponseTipIllustration;