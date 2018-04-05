export interface IHasConstructorWithParams<TParams, TClassType> {
  new(params: Partial<TParams>): TClassType;
}
