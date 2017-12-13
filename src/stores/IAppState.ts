import { OrderedMap } from 'immutable';
export interface IAppState {
  items: {
    byId: OrderedMap<string, Record<string, any>>;
    newItemText: string;
  };
}
