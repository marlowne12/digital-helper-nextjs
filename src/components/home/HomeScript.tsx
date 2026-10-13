"use client";

import { useEffect } from "react";

// Runs the redesigned homepage's vanilla JS each time the homepage mounts
// (works for both full loads and client-side navigation back to "/").
export function HomeScript() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "/home/script.js";
    s.async = false;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);
  return null;
}
