import { Mail } from "lucide-react";
import type { IconComponent } from "@/components/ui/icons/BrandIcons";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons/BrandIcons";

export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export const FOOTER_LINKS: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export interface SocialLinkItem {
  name: string;
  href: string;
  icon: IconComponent;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  { name: "GitHub", href: "https://github.com/arwamalherz-cmyk", icon: GithubIcon },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/arwa-m-alherz-5782273b0",
    icon: LinkedinIcon,
  },
  { name: "Email", href: "mailto:arwamalherz@gmail.com", icon: Mail },
];
