import React from "react";
import { DigitalHelperMark } from "./DigitalHelperMark";
import { DigitalHelperWordmark } from "./DigitalHelperWordmark";

type Variant = "dark" | "light";

interface DigitalHelperLogoProps {
  variant?: Variant;
  markSize?: number;
  wordmarkFontSize?: number;
  gap?: number;
  showRule?: boolean;
  className?: string;
}

export const DigitalHelperLogo: React.FC<DigitalHelperLogoProps> = ({
  variant = "dark",
  markSize = 48,
  wordmarkFontSize = 20,
  gap = 16,
  showRule = true,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
      }}
    >
      <DigitalHelperMark variant={variant} size={markSize} />
      <DigitalHelperWordmark
        variant={variant}
        fontSize={wordmarkFontSize}
        showRule={showRule}
      />
    </div>
  );
};
