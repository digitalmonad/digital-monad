import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { CircleDotIcon } from "lucide-react";
import { GitHubIcon, RssIcon } from "./icons";

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
          <span className="flex gap-2 items-center text-muted-foreground">
            <CircleDotIcon className="h-4 w-4" />
            <span className="font-bold">Digital Monad</span>
          </span>
          <div className="flex items-center">
            <div className="flex flex-row space-x-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all text-muted-foreground hover:text-foreground dark:hover:text-foreground flex align-middle relative py-1 px-2 m-1"
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center ml-6 border-l pl-4">
              <div className="flex items-center space-x-2">
                <Link href="/github">
                  <GitHubIcon className="fill-muted-foreground/50 dark:fill-muted-foreground hover:fill-foreground transition-[fill] bg-background h-6 w-6" />
                </Link>

                <Link href="/rss">
                  <RssIcon className="text-muted-foreground/50 dark:text-muted-foreground hover:text-foreground stroke-background transition-[color] bg-background h-6 w-6" />
                </Link>
              </div>
              <div className="pl-4 ml-4 border-l py-1">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
