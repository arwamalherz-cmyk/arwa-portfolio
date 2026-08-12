import type { IconComponent } from '@/components/ui/icons/BrandIcons';

interface SocialLinkProps {
  href: string;
  label: string;
  icon: IconComponent;
}

export function SocialLink({ href, label, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-primary/40 hover:text-primary"
    >
      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}
