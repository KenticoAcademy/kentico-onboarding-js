import * as memoize from 'memoizee';
import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';

const getIds = memoize((...params: string[]) => params, { length: false });

export const getNoteById = (notes: OrderedMap<Guid, Note>, noteId: Guid): Note =>
  notes.get(noteId);

export const getAllIds = (notes: OrderedMap<Guid, Note>): Guid[] =>
  getIds(...notes.keySeq().toArray());
