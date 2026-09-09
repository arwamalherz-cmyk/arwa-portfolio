import { Router } from 'express';
import type { ZodTypeAny } from 'zod';
import type { Entity, MemoryStore } from './memory-store.js';

/**
 * Builds a REST router with the standard portfolio resource shape:
 *   GET    /            list
 *   POST   /            create   (body validated by `schema`)
 *   PUT    /:id         update   (partial body validated by `schema`)
 *   DELETE /:id         remove
 *
 * `schema` validates the request body at runtime; `T` (inferred from `store`)
 * is the trusted, id-bearing entity shape.
 */
export function createCrudRouter<T extends Entity>(
  store: MemoryStore<T>,
  schema: ZodTypeAny,
): Router {
  const router = Router();
  const partialSchema = (
    schema as unknown as { partial: () => ZodTypeAny }
  ).partial();

  router.get('/', (_request, response) => {
    response.json(store.list());
  });

  router.post('/', (request, response) => {
    const parsed = schema.safeParse(request.body);
    if (!parsed.success) {
      response
        .status(400)
        .json({ message: 'Invalid payload', issues: parsed.error.issues });
      return;
    }
    response.status(201).json(store.create(parsed.data as Omit<T, 'id'>));
  });

  router.put('/:id', (request, response) => {
    const { id } = request.params;
    if (!id) {
      response.status(400).json({ message: 'Missing id' });
      return;
    }
    const parsed = partialSchema.safeParse(request.body);
    if (!parsed.success) {
      response
        .status(400)
        .json({ message: 'Invalid payload', issues: parsed.error.issues });
      return;
    }
    const updated = store.update(id, parsed.data as Partial<Omit<T, 'id'>>);
    if (!updated) {
      response.status(404).json({ message: 'Not found' });
      return;
    }
    response.json(updated);
  });

  router.delete('/:id', (request, response) => {
    const { id } = request.params;
    if (!id) {
      response.status(400).json({ message: 'Missing id' });
      return;
    }
    response.status(store.remove(id) ? 204 : 404).end();
  });

  return router;
}
