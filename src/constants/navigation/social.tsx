import { Icons } from "@/components/icons/icons";
import { siteConfig } from "@/constants/site";
import type { Social } from "@/types";

export const socials: Social[] = [
  {
    description: "Check out my open source projects and contributions",
    icon: <Icons.github />,
    name: "GitHub",
    url: siteConfig.githubUrl,
  },
  {
    description: "Connect with me professionally",
    icon: <Icons.linkedin />,
    name: "LinkedIn",
    url: "#",
  },
  //   {
  //     description: "Get in touch via email",
  //     icon: <Icons.mail />,
  //     name: "Email",
  //     url: "mailto:contect@digitalmonad.cz",
  //   },
];
