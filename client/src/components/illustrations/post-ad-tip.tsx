import React from "react";

/**
 * Ilustracja przedstawiająca wskazówki dotyczące dodawania ogłoszeń
 */
const PostAdTipIllustration: React.FC<{ className?: string }> = ({ className }) => {
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
      <circle cx="60" cy="60" r="50" fill="#FFF3EA" />
      
      {/* Ad posting form */}
      <rect 
        x="30" 
        y="30" 
        width="60" 
        height="60" 
        rx="5" 
        fill="white" 
        stroke="#FF9F43" 
        strokeWidth="2" 
      />
      
      {/* Form header */}
      <rect 
        x="30" 
        y="30" 
        width="60" 
        height="10" 
        rx="5 5 0 0" 
        fill="#FF9F43" 
      />
      
      {/* Form content */}
      <rect x="35" y="45" width="50" height="6" rx="3" fill="#FFE0C2" />
      <rect x="35" y="55" width="30" height="6" rx="3" fill="#FFE0C2" />
      <rect x="35" y="65" width="50" height="15" rx="3" fill="#FFE0C2" />
      
      {/* Submit button */}
      <rect 
        x="60" 
        y="85" 
        width="25" 
        height="8" 
        rx="4" 
        fill="#FF9F43" 
      />
      <line 
        x1="65" 
        y1="89" 
        x2="80" 
        y2="89" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      
      {/* Pencil icon */}
      <path 
        d="M85 25 L90 30 L70 50 L65 45 Z" 
        fill="#4C51BF" 
      />
      <path 
        d="M65 45 L65 50 L70 50" 
        stroke="#4C51BF" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Highlighting stars */}
      <path 
        d="M25 55 L25 58 M23 56.5 L27 56.5" 
        stroke="#FC8181" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M95 65 L95 68 M93 66.5 L97 66.5" 
        stroke="#FC8181" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M40 20 L40 23 M38 21.5 L42 21.5" 
        stroke="#FC8181" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export default PostAdTipIllustration;