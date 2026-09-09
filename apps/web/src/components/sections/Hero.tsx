import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLink } from "@/components/ui/SocialLink";
import { InteractiveIdCard } from "@/components/sections/InteractiveIdCard";
import { TechStack } from "@/components/sections/TechStack";
import { SOCIAL_LINKS } from "@/lib/navigation";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-x-hidden pt-8 lg:pt-12"
    >
      <div className="pb-10 lg:pb-16">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:pt-2">
            <div className="min-w-0 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-sm font-medium text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                Available for opportunities
              </span>

              <h1 className="mt-6 font-extrabold tracking-tight text-text">
                <span className="block text-5xl sm:text-6xl lg:text-[3.75rem] lg:leading-[1.05]">
                  Hi, I&rsquo;m
                </span>
                <span className="mt-1 block text-gradient-brand text-5xl sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]">
                  Arwa Alherz
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary lg:mx-0 lg:text-[1.15rem]">
                I build modern, responsive and user-friendly digital experiences
                with clean code and meaningful design.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button href="#projects" size="lg">
                  View My Work
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button href="#" variant="secondary" size="lg">
                  Download CV
                  <Download size={18} aria-hidden="true" />
                </Button>
              </div>

              <div className="mt-9">
                <p className="text-sm font-medium text-text-secondary">
                  Find me on
                </p>
                <div className="mt-3 flex justify-center gap-3 lg:justify-start">
                  {SOCIAL_LINKS.map((social) => (
                    <SocialLink
                      key={social.name}
                      href={social.href}
                      label={social.name}
                      icon={social.icon}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — ID card hanging from behind the navbar (drag / flick to swing) */}
            <div className="flex justify-center lg:-mt-28 lg:mr-10 lg:justify-end">
              <InteractiveIdCard
                name="Arwa Alherz"
                title="Computer Science Student"
                specialty="Full Stack Web Development"
                location="Dammam"
                experience="3 Years"
                status="Available"
                badgeId="AR-2026-DEV"
                accentColor="#3B82F6"
                ropeLength={150}
              />
            </div>
          </div>
        </Container>
      </div>

      <TechStack className="mt-8 lg:mt-12" />
    </section>
  );
}
