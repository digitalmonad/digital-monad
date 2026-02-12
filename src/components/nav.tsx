"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { CircleDotIcon, MenuIcon } from "lucide-react";
import { GitHubIcon, RssIcon } from "./icons";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
};

export function MobileNavigtaion() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden flex justify-between w-full items-center gap-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
            <MenuIcon className="h-5 w-5 stroke-2" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-5/6">
          <SheetHeader>
            <SheetTitle className="flex flex-col pt-20 justify-center items-center gap-8 text-foreground font-bold text-2xl">
              <CircleDotIcon className="w-6 h-6" />
              Digital Monad
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col px-4 flex-1">
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className="transition-all text-foreground text-lg capitalize"
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 p-8 border-t">
              <Link
                href="/github"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <GitHubIcon className="fill-muted-foreground/50 dark:fill-muted-foreground hover:fill-foreground transition-[fill] bg-background h-6 w-6" />
                <span>GitHub</span>
              </Link>
              <Link
                href="/rss"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <RssIcon className="text-muted-foreground/50 dark:text-muted-foreground hover:text-foreground stroke-background transition-[color] bg-background h-6 w-6" />
                <span>RSS</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <ThemeToggle />
    </div>
  );
}

export function Navbar() {
  return (
    <aside className="sticky top-0 z-50 mb-16 tracking-tight w-7xl mx-auto px-4 pt-4 pb-4 bg-background/80 backdrop-blur-xs">
      <nav
        className="flex flex-row items-center justify-between relative px-0 fade md:overflow-auto scroll-pr-6"
        id="nav"
      >
        {/* Mobile Navigation */}
        <MobileNavigtaion />
        <span className="gap-2 items-center text-muted-foreground hidden md:flex">
          <CircleDotIcon className="h-4 w-4" />
          <span className="font-bold">Digital Monad</span>
        </span>

        <div className="hidden md:flex items-center">
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
    </aside>
  );
}
