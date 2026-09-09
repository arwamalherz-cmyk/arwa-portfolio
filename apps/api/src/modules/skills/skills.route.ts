import { z } from 'zod';
import { createCrudRouter } from '../../lib/crud-router.js';
import { createMemoryStore, type Entity } from '../../lib/memory-store.js';

export const skillSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['Languages', 'Frontend', 'Backend', 'Database', 'Tools']),
  level: z.number().int().min(0).max(100).optional(),
});

export type Skill = z.infer<typeof skillSchema> & Entity;

const seed: Skill[] = [
  { id: '44444444-4444-4444-4444-444444444441', name: 'JavaScript', category: 'Languages', level: 85 },
  { id: '44444444-4444-4444-4444-444444444442', name: 'React', category: 'Frontend', level: 85 },
  { id: '44444444-4444-4444-4444-444444444443', name: 'Node.js', category: 'Backend', level: 60 },
  { id: '44444444-4444-4444-4444-444444444444', name: 'PostgreSQL', category: 'Database', level: 55 },
];

const store = createMemoryStore<Skill>(seed);
export const skillsRouter = createCrudRouter(store, skillSchema);
