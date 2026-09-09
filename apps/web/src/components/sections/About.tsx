import {
  Code2,
  Database,
  GraduationCap,
  MapPin,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FOCUS_AREAS = [
  { icon: Code2, label: "Web development" },
  { icon: MonitorSmartphone, label: "Responsive interfaces" },
  { icon: Database, label: "Database-connected apps" },
];

const EXPLORING = [
  "Backend development",
  "REST APIs",
  "Database design",
  "AI integration",
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About Me"
              title={
                <>
                  Turning ideas into clean,{" "}
                  <span className="text-gradient-brand">usable software</span>
                </>
              }
            />

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              I am a Computer Science student at Imam Abdulrahman Bin Faisal
              University with hands-on experience in web development, responsive
              interfaces, and database-connected applications. I enjoy building
              user-friendly digital solutions and am currently expanding my
              knowledge in backend development, REST APIs, database design, and
              AI integration.
            </p>

            <div className="mt-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-text">
                <Sparkles size={16} className="text-primary" aria-hidden="true" />
                Currently exploring
              </p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {EXPLORING.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-sm font-medium text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Profile / education card */}
          <div className="rounded-3xl bg-gradient-brand p-px shadow-xl shadow-primary/10">
            <div className="rounded-[calc(1.5rem-1px)] bg-surface p-7 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <GraduationCap size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-base font-bold text-text">
                    Computer Science Student
                  </p>
                  <p className="mt-0.5 text-sm text-text-secondary">
                    Imam Abdulrahman Bin Faisal University
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-border pt-5 text-sm text-text-secondary">
                <MapPin size={16} className="text-primary" aria-hidden="true" />
                Based in Dammam, Saudi Arabia
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Focus areas
              </p>
              <ul className="mt-3 space-y-2.5">
                {FOCUS_AREAS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 text-sm font-medium text-text"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-primary-soft/60 text-primary">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
