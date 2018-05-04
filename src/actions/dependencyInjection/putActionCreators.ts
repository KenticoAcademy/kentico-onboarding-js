import * as fetch from 'isomorphic-fetch';
import { fetchWithIdFactory } from '../thunkFactories/fetchFactories';
import { putNoteFactory } from '../thunkFactories/putNoteFactory';
import { HttpMethods } from '../../enums/HttpMethods';
import { urlBuilder } from '../../utils/urlBuilder';

const sendRequest = fetchWithIdFactory(fetch, urlBuilder, HttpMethods.PUT);

export const updateServerNote = (noteId: Guid, updatedNoteText: string) =>
  putNoteFactory({ sendRequest })({
    text: updatedNoteText,
    id: noteId
  });
