export abstract class TaskRepository<T> {
  abstract create(data: T): Promise<T>;
  abstract update(data: T, id: string): Promise<T>;
  abstract delete(id: string): Promise<T>;
  abstract find(id: string): Promise<T>;
  abstract findAll(userId: string): Promise<T[]>;
}
