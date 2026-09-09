import { Router } from 'express';
import { z } from 'zod';
import { createMemoryStore, type Entity } from '../../lib/memory-store.js';

export const contactMessageSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(4000),
});

export type ContactMessage = z.infer<typeof contactMessageSchema> &
  Entity & { createdAt: string };

const store = createMemoryStore<ContactMessage>();

export const contactRouter = Router();

// Public: submit a message from the portfolio contact form.
contactRouter.post('/', (request, response) => {
  const parsed = contactMessageSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ message: 'Invalid payload', issues: parsed.error.issues });
    return;
  }
  const created = store.create({
    ...parsed.data,
    createdAt: new Date().toISOString(),
  });
  response.status(201).json(created);
});

// Admin: list received messages, newest first.
// TODO(auth): require an authenticated admin once auth exists.
contactRouter.get('/', (_request, response) => {
  const messages = [...store.list()].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  response.json(messages);
});
