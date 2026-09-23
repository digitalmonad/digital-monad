import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { Icons } from "@/components/icons/icons";
import { siteConfig } from "@/constants/site";

export const linkItems: LinkItemType[] = [
  {
    active: "url",
    icon: <Icons.user />,
    text: "About me",
    url: `${siteConfig.url}${siteConfig.links.about}`,
  },
  //   {
  //     active: "nested-url",
  //     icon: <Icons.work />,
  //     text: "Work",
  //     url: `${siteConfig.url}${siteConfig.links.work}`,
  //   },
  {
    active: "nested-url",
    icon: <Icons.blog />,
    text: "Blog",
    url: `${siteConfig.url}${siteConfig.links.docs}`,
  },
];
