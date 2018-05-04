import { OrderedMap } from 'immutable';
import { ApplicationError } from '../../models/ApplicationError';

export const getErrorById = (errors: OrderedMap<Guid, ApplicationError>, errorId?: Guid): ApplicationError => {
  if (errorId === undefined || errorId === null) {
    throw Error('Undefined error ID not allowed in this operation!');
  }

  return errors
    .get(errorId);
};
