import type { Metadata } from "next";
import { ProfilePageJsonLd } from "@/components/json-ld";
import Separator from "@/components/layout/sections/separator";
import { description as homeDescription } from "@/constants/site";
import { getGitHubContributions } from "@/lib/github-contributions";
import { createMetadata } from "@/lib/metadata";
import About from "./_components/about";
import Contributions from "./_components/contributions";
import CTA from "./_components/cta";
import Hero from "./_components/hero";
import Skills from "./_components/skills";
import WorkPreview from "./_components/work";

export const metadata: Metadata = createMetadata({
  alternates: { canonical: "/" },
  description: homeDescription,
  openGraph: { images: "/images/projects/portfolio/cover.png", url: "/" },
  title: "Home",
  twitter: { images: "/images/projects/portfolio/cover.png" },
});

export default async function Home() {
  const contributions = getGitHubContributions();

  return (
    <>
      <ProfilePageJsonLd description={homeDescription} path="/" title="Home" />
      <>
        <Hero />
        <Separator />
        {/* <About />
        <Separator /> */}
        <WorkPreview />
        <Separator />
        {/* <Contributions contributions={contributions} />
        <Separator /> */}
        <Skills />
        <Separator />
        <CTA />
      </>
    </>
  );
}
