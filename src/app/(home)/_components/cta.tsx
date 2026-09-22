import Link from "next/link";
import type React from "react";
import { Icons } from "@/components/icons/icons";
import { Section } from "@/components/layout/sections";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export default function CTA(): React.ReactElement {
  return (
    <Section className="p-4">
      <div className="grid place-items-center gap-4 rounded-xl border bg-card p-8 shadow-sm sm:p-16">
        <div>
          <h2 className="typography-title text-balance text-center font-regular text-3xl tracking-tighter sm:text-5xl">
            Let's Collaborate
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div>
            <p className="typography-body text-pretty text-center text-muted-foreground sm:text-xl">
              Have questions or want to connect? Reach out through the contact
              form or find me on social platforms.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div>
              <Button asChild size="lg">
                <Link href={`${siteConfig.url}${siteConfig.links.contact}`}>
                  Contact Me{" "}
                  <Icons.arrowRight className="icon-arrow-button size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
