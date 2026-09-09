import { randomUUID } from 'node:crypto';

/**
 * In-memory collection used while the portfolio has no database yet.
 * Swap this for Prisma-backed repositories later without touching the routes.
 */
export interface Entity {
  id: string;
}

export interface MemoryStore<T extends Entity> {
  list(): T[];
  get(id: string): T | undefined;
  create(data: Omit<T, 'id'>): T;
  update(id: string, data: Partial<Omit<T, 'id'>>): T | undefined;
  remove(id: string): boolean;
}

export function createMemoryStore<T extends Entity>(seed: T[] = []): MemoryStore<T> {
  const items = new Map<string, T>(seed.map((item) => [item.id, item]));

  return {
    list: () => [...items.values()],
    get: (id) => items.get(id),
    create: (data) => {
      const entity = { ...data, id: randomUUID() } as T;
      items.set(entity.id, entity);
      return entity;
    },
    update: (id, data) => {
      const existing = items.get(id);
      if (!existing) return undefined;
      const next = { ...existing, ...data, id };
      items.set(id, next);
      return next;
    },
    remove: (id) => items.delete(id),
  };
}
