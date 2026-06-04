"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Lazy load ChatWidget - not needed for initial render
// This reduces initial bundle size by deferring AI SDK and chat logic
const ChatWidget = dynamic(
  () => import("@/components/ChatWidget").then((mod) => mod.ChatWidget),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-6 right-6 z-[60]">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      </div>
    ),
  }
);

export function LazyChat() {
  return <ChatWidget />;
}
