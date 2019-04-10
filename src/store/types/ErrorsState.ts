import { ListError } from '../../models/ListError';
import { OrderedMap } from 'immutable';

export type ErrorsState = OrderedMap<Uuid, ListError>;
