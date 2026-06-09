import React from "react";

type Variant = "dark" | "light";

interface DigitalHelperWordmarkProps {
  variant?: Variant;
  fontSize?: number;
  showRule?: boolean;
  className?: string;
}

const BONE = "#F2EFE9";
const BLACK = "#0E0F11";

export const DigitalHelperWordmark: React.FC<DigitalHelperWordmarkProps> = ({
  variant = "dark",
  fontSize = 32,
  showRule = true,
  className,
}) => {
  const color = variant === "dark" ? BONE : BLACK;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: showRule ? fontSize * 0.22 : 0,
      }}
    >
      <div
        style={{
          color,
          fontFamily: "var(--font-geist-mono), 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace",
          fontSize,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        DIGITAL HELPER
      </div>
      {showRule && (
        <div
          style={{
            alignSelf: "center",
            width: "80%",
            height: 1,
            backgroundColor: color,
            opacity: 0.85,
          }}
        />
      )}
    </div>
  );
};
