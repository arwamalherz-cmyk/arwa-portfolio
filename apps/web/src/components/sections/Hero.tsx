import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SocialLink } from '@/components/ui/SocialLink';
import { TerminalCard } from '@/components/sections/TerminalCard';
import { SOCIAL_LINKS } from '@/lib/navigation';

export function Hero() {
  return (
    <section id="home" className="overflow-x-hidden py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-lavender px-4 py-1.5 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Available for opportunities
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
              <span className="block">
                Hi, I'm <span className="text-primary">Arwa</span>.
              </span>
              <span className="block">I build digital experiences</span>
              <span className="block">
                that make an <span className="text-primary">impact</span>.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary lg:mx-0">
              Computer Science student passionate about building beautiful, responsive and
              user-friendly web applications with clean code and modern technologies.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button href="#projects">
                Explore My Work
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#" variant="secondary">
                Download CV
                <Download size={16} aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-10">
              <p className="text-sm font-medium text-text-secondary">Find me on</p>
              <div className="mt-3 flex justify-center gap-3 lg:justify-start">
                {SOCIAL_LINKS.map((social) => (
                  <SocialLink key={social.name} href={social.href} label={social.name} icon={social.icon} />
                ))}
              </div>
            </div>
          </div>

          <TerminalCard />
        </div>
      </Container>
    </section>
  );
}
