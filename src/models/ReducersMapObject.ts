import { Reducer } from 'redux';

export type ReducersMapObject<TState> = {
  [prop in keyof TState]: Reducer<TState[prop]>;
};
