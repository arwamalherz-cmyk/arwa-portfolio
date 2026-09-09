import { z } from 'zod';
import { createCrudRouter } from '../../lib/crud-router.js';
import { createMemoryStore, type Entity } from '../../lib/memory-store.js';

export const certificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  year: z.number().int(),
  url: z.string().url().optional(),
});

export type Certificate = z.infer<typeof certificateSchema> & Entity;

const seed: Certificate[] = [
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    year: 2025,
  },
];

const store = createMemoryStore<Certificate>(seed);
export const certificatesRouter = createCrudRouter(store, certificateSchema);
