import { OrderedMap } from 'immutable';
import { Note } from './Note';

export interface IStoreState {
  readonly notes: INotesState;
}

export interface INotesState {
    readonly listOfNotes: OrderedMap<Guid, Note>;
    readonly isAddingNote: boolean;
    readonly addNoteText: string;
}
