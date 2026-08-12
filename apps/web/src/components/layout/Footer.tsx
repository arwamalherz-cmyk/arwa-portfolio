import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { SocialLink } from '@/components/ui/SocialLink';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/navigation';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="flex flex-col items-center gap-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-text-secondary">Built with React, TypeScript & passion.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <SocialLink key={social.name} href={social.href} label={social.name} icon={social.icon} />
            ))}
          </div>
        </div>

        <div className="border-t border-border py-6 text-center text-xs text-text-secondary">
          © 2026 Arwa Alherz. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
