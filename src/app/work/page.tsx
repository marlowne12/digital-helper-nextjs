import type { Metadata } from "next";
import WorkPageContent from "./WorkPageContent";

export const metadata: Metadata = {
  title: "Our Work | Web Design & AI Automation Projects | Digital Helper",
  description: "See the websites and AI automation systems we've built for Tri-Cities local businesses. Real results, real clients.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
