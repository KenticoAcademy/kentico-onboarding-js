import * as fetch from 'isomorphic-fetch';
import { fetchWithIdFactory } from '../thunkFactories/fetchFactories';
import { HttpMethods } from '../../enums/HttpMethods';
import { deleteNoteFactory } from '../thunkFactories/deleteNoteFactory';
import { urlBuilder } from '../../utils/urlBuilder';

const sendRequest = fetchWithIdFactory(fetch, urlBuilder, HttpMethods.DELETE);

export const deleteServerNote = (noteId: Guid): Thunk =>
  deleteNoteFactory({ sendRequest })(noteId);
