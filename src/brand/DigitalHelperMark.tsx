import React from "react";

type Variant = "dark" | "light";

interface DigitalHelperMarkProps {
  variant?: Variant;
  size?: number;
  className?: string;
}

const BONE = "#F2EFE9";
const BLACK = "#0E0F11";
const AMBER = "#E89A3C";
const RED = "#B83A2C";

export const DigitalHelperMark: React.FC<DigitalHelperMarkProps> = ({
  variant = "dark",
  size = 200,
  className,
}) => {
  const blockStroke = variant === "dark" ? BONE : BLACK;
  const accentStroke = variant === "dark" ? AMBER : RED;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Digital Helper mark"
      className={className}
    >
      <path
        d="M 32 20 L 160 20 L 180 40 L 180 168 A 12 12 0 0 1 168 180 L 32 180 A 12 12 0 0 1 20 168 L 20 32 A 12 12 0 0 1 32 20 Z"
        fill="none"
        stroke={blockStroke}
        strokeWidth={6}
        strokeLinejoin="miter"
        strokeMiterlimit={4}
      />
      <line
        x1={152}
        y1={12}
        x2={188}
        y2={48}
        stroke={accentStroke}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
};
