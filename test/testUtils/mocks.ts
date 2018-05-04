import { IStoreState } from '../../src/reducers/IStoreState';
import { IServerNote } from '../../src/models/Note';
import { application } from '../../src/reducers/application';

export const mockServerNote = (text: string, id: Guid): IServerNote => ({
  text,
  id,
  lastModificationDate: new Date(2017, 12, 5),
  creationDate: new Date(2017, 12, 4),
});

export const FALSE_INITIAL_STATE = false;
export const TRUE_INITIAL_STATE = true;

export const mockStoreState = (): IStoreState =>
  application(undefined as any, { type: 'TEST_ACTION' });

