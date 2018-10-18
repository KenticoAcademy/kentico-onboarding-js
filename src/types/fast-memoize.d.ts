declare module 'fast-memoize' {

  interface Options {
    cache?: Cache;
    serializer?: (...args: any[]) => any;
    strategy?: (fn: Function, options?: Options) => Function;
  }

  function memoize<T>(fn: T, options?: Options): T;

  export = memoize;
}
