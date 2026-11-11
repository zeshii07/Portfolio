import type { NavLink, SocialLink } from "@/types/portfolio";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Email", href: "mailto:hello@zeeshan.dev", icon: "email" },
];

export const contactInfo = {
  email: "hello@zeeshan.dev",
  location: "Lahore, Pakistan · UTC+5",
  whatsapp: "https://wa.me/",
};

export const person = {
  name: "Zeeshan Ahmad",
  shortName: "Zeeshan",
  role: "Full-Stack Developer · AI Automation Builder · Cybersecurity Enthusiast",
  headline: "Building useful digital products with code, AI, and secure engineering.",
  supportingCopy:
    "I'm a software developer focused on full-stack web applications and practical AI automation. I enjoy turning real business problems into reliable, usable software.",
  availability: "Open to software engineering roles and freelance projects.",
};
