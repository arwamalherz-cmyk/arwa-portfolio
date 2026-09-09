import { z } from 'zod';
import { createCrudRouter } from '../../lib/crud-router.js';
import { createMemoryStore, type Entity } from '../../lib/memory-store.js';

export const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  period: z.string().min(1),
  description: z.string().min(1),
  current: z.boolean().optional(),
});

export type Experience = z.infer<typeof experienceSchema> & Entity;

const seed: Experience[] = [
  {
    id: '33333333-3333-3333-3333-333333333333',
    role: 'Front-End Developer (Freelance)',
    company: 'Self-employed',
    period: '2023 - Present',
    description: 'Building responsive, database-connected web interfaces for small clients and personal products.',
    current: true,
  },
];

const store = createMemoryStore<Experience>(seed);
export const experienceRouter = createCrudRouter(store, experienceSchema);
