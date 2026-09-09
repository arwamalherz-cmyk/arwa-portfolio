import type { IconComponent } from "@/components/ui/icons/BrandIcons";

interface SocialLinkProps {
  href: string;
  label: string;
  icon: IconComponent;
}

export function SocialLink({ href, label, icon: Icon }: SocialLinkProps) {
  const isExternal = /^https?:/.test(href);

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(isExternal && { target: "_blank", rel: "noreferrer" })}
      className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-primary/40 hover:text-primary"
    >
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}
