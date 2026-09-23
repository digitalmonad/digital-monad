import {
  type LinkItemType,
  resolveLinkItems,
} from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons/icons";
import { Section } from "@/components/layout/sections";
import { buttonVariants } from "@/components/ui/button";
import { linkItems } from "@/constants/navigation";
import { baseOptions, siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

const Hero = () => {
  const links = resolveLinkItems({
    githubUrl: baseOptions.githubUrl,
    links: linkItems,
  }) as LinkItemType[];
  const navItems = links.filter((item) =>
    ["nav", "all"].includes(item.on ?? "all"),
  );

  return (
    <Section className="relative flex flex-col items-center justify-center gap-4 overflow-hidden px-4 py-24 sm:px-16 sm:py-32 md:py-40">
      <h1
        className={cn(
          "typography-hero text-balance text-center font-normal text-4xl leading-tight tracking-tighter",
          "md:text-5xl",
        )}
      >
        I'm Pavel
      </h1>
      <p className="max-w-sm text-pretty text-center text-base text-muted-foreground leading-relaxed tracking-tight sm:max-w-xl sm:text-lg md:text-xl">
        Fullstack software developer
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        {/* <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "default",
            }),
            "rounded-full bg-primary hover:bg-primary/90",
          )}
          href={`${siteConfig.url}${siteConfig.links.work}`}
        >
          Browse Work
          <Icons.arrowRight className="icon-arrow-button size-5" />
        </Link> */}

        <div className="flex items-center space-x-4">
          {navItems
            .filter((item) => item.type === "icon")
            .map((item, i) => (
              <Link
                key={i}
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                  "rounded-full",
                )}
                href={item.url}
                rel={item.external ? "noopener noreferrer" : undefined}
                target={item.external ? "_blank" : undefined}
              >
                {item.icon}
                <span className="sr-only">{item.text}</span>
              </Link>
            ))}
        </div>
      </div>
    </Section>
  );
};

export default Hero;
