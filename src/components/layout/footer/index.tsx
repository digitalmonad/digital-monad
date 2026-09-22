import { ThemeToggle } from "@/components/layout/header/theme-toggle";
import { owner } from "@/constants/site";
import { cn } from "@/lib/utils";
import { Links } from "./links";

export const Footer = () => (
  <footer
    className={cn(
      "container mx-auto flex flex-col gap-6 px-4 py-6 pb-24",
      "border-border border-b border-dashed",
      "sm:gap-16 sm:px-8 sm:py-16",
    )}
  >
    <Links />
    <div className="grid items-center gap-4 sm:grid-cols-3">
      <div className="hidden w-min sm:flex">
        <span aria-hidden className="block size-8" />
      </div>
      <div className="flex items-center justify-center">
        <div>
          <p className="whitespace-nowrap text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {owner}. All rights reserved.
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-2 sm:flex sm:justify-end">
        <ThemeToggle mode="light-dark-system" />
      </div>
      <div className="flex items-center justify-between sm:hidden">
        <div className="w-min">
          <span aria-hidden className="block size-8" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle mode="light-dark-system" />
        </div>
      </div>
    </div>
  </footer>
);
