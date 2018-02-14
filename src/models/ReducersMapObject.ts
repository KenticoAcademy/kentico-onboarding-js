import { Reducer } from 'redux';

export type ReducersMapObject<S> = {
  [P in keyof S]: Reducer<S[P]>;
};
