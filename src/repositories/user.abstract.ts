export abstract class UserRepository<T> {
  abstract create(data: T): Promise<T>;
  abstract update(data: T, id: string): Promise<T>;
  abstract delete(id: string): Promise<T>;
  abstract find(email: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
}
