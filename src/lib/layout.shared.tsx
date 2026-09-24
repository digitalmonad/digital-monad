import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [
      { text: "About", url: "/#about", type: "main" },
      { text: "Work", url: "/#work", type: "main" },
      { text: "Blog", url: "/blog", type: "main" },
      { text: "Contact", url: "/#contact", type: "button" },
    ],
  };
}
