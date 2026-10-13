"use client";

import { usePathname } from "next/navigation";

// The redesigned homepage ("/") ships its own header and footer,
// so the shared site chrome is hidden on that route only.
export function HideOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
