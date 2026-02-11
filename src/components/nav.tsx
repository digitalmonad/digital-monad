import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { RssIcon } from "lucide-react";
import { Button } from "./ui/button";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 tracking-tight px-4 pt-4">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <Button asChild variant={"ghost"} size={"icon-sm"}>
              <Link href="/rss">
                <RssIcon className="h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
            <div className="pl-4 ml-4 border-l">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
