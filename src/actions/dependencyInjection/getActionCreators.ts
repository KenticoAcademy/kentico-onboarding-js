import { fetchFactory } from '../thunkFactories/fetchFactories';
import { HttpMethods } from '../../enums/HttpMethods';
import { getNotesFactory } from '../thunkFactories/getNotesFactory';
import { IServerNote } from '../../models/Note';
import { injectFetchWithApiPrefix } from './fetchInjection';

const sendRequest = fetchFactory<IServerNote[]>(injectFetchWithApiPrefix, HttpMethods.GET);

export const getAllNotes = (errorId?: Guid) =>
  getNotesFactory({ sendRequest })(errorId);
