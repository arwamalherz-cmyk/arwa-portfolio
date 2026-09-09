import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS } from "@/lib/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_LINKS.map((link) => link.id));

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 pt-4">
      <Container>
        <div className="flex min-h-17.5 items-center justify-between gap-4 rounded-full border border-border bg-surface/85 px-4 py-3 shadow-lg shadow-navy/5 backdrop-blur-md dark:shadow-black/30 sm:px-6">
          <a href="#home" aria-label="Go to home section" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-primary-soft text-primary"
                          : "text-text-secondary hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle />
            <Button href="#contact" size="sm">
              Let's Talk
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors duration-200 hover:border-primary/40 hover:text-primary"
            >
              {isMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="lg:hidden">
          <Container>
            <ul className="mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-surface p-3 shadow-lg shadow-primary/5">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-primary-soft text-primary"
                          : "text-text-secondary hover:bg-primary-soft/60 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-2">
                <Button
                  href="#contact"
                  size="sm"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Let's Talk
                </Button>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
