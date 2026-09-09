import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";

/**
 * Sections still to be built out. They keep their anchor ids so the navbar
 * links and scroll-spy keep working until each gets a real component.
 */
const PLACEHOLDER_SECTIONS = [
  "skills",
  "experience",
  "education",
  "projects",
  "certificates",
  "contact",
];

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      {PLACEHOLDER_SECTIONS.map((id) => (
        <section key={id} id={id} aria-label={id} className="scroll-mt-24" />
      ))}
    </>
  );
}
