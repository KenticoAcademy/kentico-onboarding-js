import * as Guid from 'guid';

export const generateId = () =>
  Guid.create().value;
