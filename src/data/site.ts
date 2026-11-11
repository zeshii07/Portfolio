import type { NavLink, SocialLink } from "@/types/portfolio";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/zeshii07", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hafiz-muhammad-zeeshan-718a03410",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:zeeshansultan785@gmail.com", icon: "email" },
];

export const contactInfo = {
  email: "zeeshansultan785@gmail.com",
  location: "Based in Pakistan",
  locationDetail: "Lahore, Pakistan · UTC+5",
  whatsapp: "https://wa.me/+923019299608",
};

export const person = {
  name: "Zeeshan Ahmad",
  shortName: "Zeeshan",
  wordmark: "ZEESHAN",
  role: "Full-Stack Developer · AI Automation · Secure Engineering",
  headline: "I build digital experiences that turn complex ideas into useful products.",
  supportingCopy:
    "Full-stack developer exploring the intersection of software engineering, AI automation, and secure digital products.",
  availability: "Open to software engineering roles and freelance projects.",
  /** Short About preview copy */
  aboutPreview:
    "I'm Zeeshan — a software developer who turns real business problems into reliable, usable software. I work across full-stack web apps, AI automation, and security-conscious engineering.",
};
