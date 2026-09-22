import Link from "next/link";
import { Icons } from "@/components/icons/icons";
import { SectionHeader } from "@/components/layout/sections/header";
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionSidebar,
} from "@/components/layout/sections/split";
import { Prose } from "@/components/prose";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export default function About(): React.ReactElement {
  return (
    <SplitSection>
      <SplitSectionSidebar>
        <SectionHeader align="left" title="About Me" />
      </SplitSectionSidebar>

      <SplitSectionContent inset>
        <div className="relative">
          <div className="space-y-4">
            <Prose className="typography-body w-full space-y-4">
              <p className="text-lg">
                I'm Pavel, a full-stack developer who builds all kinds of web
                apps.
              </p>
              <p className="text-lg">
                My stack is Next.js, TypeScript, tRPC, Drizzle, and PostgreSQL.
              </p>
            </Prose>
            <Link
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "link",
                }),
                "!p-0 h-fit",
              )}
              href={`${siteConfig.url}${siteConfig.links.about}`}
            >
              Learn More
              <Icons.arrowRight className="icon-arrow-button size-4" />
            </Link>
          </div>
        </div>
      </SplitSectionContent>
    </SplitSection>
  );
}
