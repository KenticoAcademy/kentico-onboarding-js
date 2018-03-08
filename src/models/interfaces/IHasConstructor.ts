export interface IHasConstructor<T, R> {
  new(params: Partial<T>): R;
}
