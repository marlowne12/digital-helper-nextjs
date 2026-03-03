import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About | Digital Helper — Web Design & AI Automation Tri-Cities WA",
  description: "Digital Helper is a Richland, WA agency building modern websites and AI automation for Tri-Cities local businesses. Meet the team behind the tech.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
