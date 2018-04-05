import { OrderedMap } from 'immutable';

import { Key } from '../@types/Key';
import { BaseRecord } from './BaseRecord';

export interface IErrorComposition {
  readonly globalError: string;
  readonly itemsError: OrderedMap<Key, string>;
}

const defaultError: IErrorComposition = {
  globalError: '',
  itemsError: OrderedMap<Key, string>(),
};

export class ErrorComposition extends BaseRecord<IErrorComposition>(defaultError, 'errorComposition') implements IErrorComposition {
  readonly globalError: string;
  readonly itemsError: OrderedMap<Key, string>;
}
