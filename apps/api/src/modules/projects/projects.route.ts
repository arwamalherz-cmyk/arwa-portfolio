import { z } from 'zod';
import { createCrudRouter } from '../../lib/crud-router.js';
import { createMemoryStore, type Entity } from '../../lib/memory-store.js';

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()).default([]),
  url: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  year: z.number().int().optional(),
  featured: z.boolean().optional(),
});

export type Project = z.infer<typeof projectSchema> & Entity;

const seed: Project[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    title: 'Personal Portfolio',
    description: 'React + TypeScript portfolio with a Tailwind design system and an admin-ready architecture.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    repoUrl: 'https://github.com/arwamalherz-cmyk',
    year: 2026,
    featured: true,
  },
];

const store = createMemoryStore<Project>(seed);
export const projectsRouter = createCrudRouter(store, projectSchema);
