import { Hero } from '@/components/sections/Hero';

const PLACEHOLDER_SECTIONS = ['about', 'skills', 'experience', 'projects', 'certificates', 'contact'];

export function HomePage() {
  return (
    <>
      <Hero />
      {PLACEHOLDER_SECTIONS.map((id) => (
        <section key={id} id={id} aria-label={id} />
      ))}
    </>
  );
}
