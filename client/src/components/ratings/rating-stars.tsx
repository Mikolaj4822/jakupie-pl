import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  className,
  interactive = false,
  onChange
}: RatingStarsProps) {
  // Ensure rating is within valid range
  const validRating = Math.max(0, Math.min(rating, maxRating));
  
  const sizeStyles = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    // Calculate if this star should be full, half, or empty
    const difference = validRating - i + 1;
    let starType: "full" | "half" | "empty" = "empty";
    
    if (difference >= 1) {
      starType = "full";
    } else if (difference >= 0.5) {
      starType = "half";
    }
    
    stars.push(
      <span 
        key={i}
        className={cn(
          interactive && "cursor-pointer transition-colors hover:text-yellow-500", 
          "inline-block"
        )}
        onClick={() => {
          if (interactive && onChange) {
            onChange(i);
          }
        }}
      >
        {starType === "full" && (
          <Star className={cn(sizeStyles[size], "text-yellow-500 fill-yellow-500")} />
        )}
        {starType === "half" && (
          <StarHalf className={cn(sizeStyles[size], "text-yellow-500 fill-yellow-500")} />
        )}
        {starType === "empty" && (
          <Star className={cn(sizeStyles[size], "text-gray-300")} />
        )}
      </span>
    );
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      {stars}
    </div>
  );
}