import { fetchFactory } from '../thunkFactories/fetchFactories';
import { HttpMethods } from '../../enums/HttpMethods';
import { IServerNote } from '../../models/Note';
import { injectFetchWithApiPrefix } from './fetchInjection';
import {
  postNoteFactory,
  repostNoteFactory
} from '../thunkFactories/postNoteFactory';

const sendRequest = fetchFactory<IServerNote>(injectFetchWithApiPrefix, HttpMethods.POST);

export const addNewNote = (newNoteText: string) =>
  postNoteFactory({ sendRequest })({ text: newNoteText });

export const retryAddNewNote = (localId: Guid, newNoteText: string) =>
  repostNoteFactory({ sendRequest })({ text: newNoteText }, localId);
