declare module 'fast-memoize' {
  function memoize<T>(
    fn: T,
    options?: any
  ): T;
  export = memoize;
}
