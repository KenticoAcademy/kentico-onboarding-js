import { OrderedMap } from 'immutable';
import { ItemError } from '../../models/Error';

export type IErrorsState = OrderedMap<Guid, ItemError>;
