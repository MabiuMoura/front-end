import React, { useEffect, useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useTheme } from "styled-components";

interface StarRatingProps {
  onRatingSelect: (rating: number) => void;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingSelect, initialRating = 0 }) => {
  const [rating, setRating] = useState<number>(initialRating);
  const theme = useTheme();
  
  const handleClick = (value: number) => {
    setRating(value);
    onRatingSelect(value);
  };

  useEffect(() => {
    setRating(initialRating); 
  }, [initialRating]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <MdOutlineStarPurple500
          key={value}
          size={17}
          color={value <= rating ? "#ffc107" : theme.colors.primary_colors.lilac}
          onClick={() => handleClick(value)}
          style={{ cursor: "pointer", marginRight: 1 }}
        />
      ))}
    </div>
  );
};

export default StarRating;
