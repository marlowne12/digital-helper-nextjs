import React from "react";

type Variant = "dark" | "light";

interface DigitalHelperMonogramProps {
  variant?: Variant;
  size?: number;
  className?: string;
}

const BONE = "#F2EFE9";
const BLACK = "#0E0F11";
const AMBER = "#E89A3C";
const RED = "#B83A2C";

export const DigitalHelperMonogram: React.FC<DigitalHelperMonogramProps> = ({
  variant = "dark",
  size = 64,
  className,
}) => {
  const text = variant === "dark" ? BONE : BLACK;
  const accent = variant === "dark" ? AMBER : RED;
  const fontSize = size * 0.78;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          color: text,
          fontFamily: "var(--font-geist-mono), 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace",
          fontSize,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        DH
      </div>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <line
          x1={86}
          y1={70}
          x2={122}
          y2={130}
          stroke={accent}
          strokeWidth={4}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
