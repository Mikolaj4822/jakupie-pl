import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HelpBubbleProps {
  title?: string;
  content: string | React.ReactNode;
  illustration?: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  showIcon?: boolean;
  iconSize?: number;
  className?: string;
  bubbleClassName?: string;
  permanent?: boolean;
}

/**
 * HelpBubble - A component for displaying contextual help information with optional illustrations.
 * 
 * @param title - Optional title for the help bubble
 * @param content - The content to display in the help bubble (text or JSX)
 * @param illustration - Optional illustration to display in the help bubble
 * @param position - Position of the bubble relative to the icon (default: "top")
 * @param showIcon - Whether to show the help icon (default: true)
 * @param iconSize - Size of the help icon in pixels (default: 18)
 * @param className - Additional classes for the container
 * @param bubbleClassName - Additional classes for the bubble
 * @param permanent - If true, keeps the bubble visible without needing to hover (default: false)
 */
const HelpBubble: React.FC<HelpBubbleProps> = ({
  title,
  content,
  illustration,
  position = "top",
  showIcon = true,
  iconSize = 18,
  className,
  bubbleClassName,
  permanent = false,
}) => {
  const [isOpen, setIsOpen] = useState(permanent);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close bubble
  useEffect(() => {
    if (!permanent && isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, permanent]);
  
  // Determine position classes
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      onMouseEnter={() => !permanent && setIsOpen(true)}
      onMouseLeave={() => !permanent && setIsOpen(false)}
    >
      {showIcon && (
        <button 
          type="button"
          onClick={() => permanent && setIsOpen(!isOpen)}
          className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
          aria-label="Show help"
        >
          <HelpCircle size={iconSize} />
        </button>
      )}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 w-64 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
              positionClasses[position],
              bubbleClassName
            )}
          >
            {permanent && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close help"
              >
                <X size={16} />
              </button>
            )}
            
            {title && (
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
            )}
            
            <div className="flex flex-col gap-3">
              {illustration && (
                <div className="flex justify-center mb-2">
                  {illustration}
                </div>
              )}
              
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpBubble;