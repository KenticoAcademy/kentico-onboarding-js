import { AbstractRecord } from './AbstractRecord';
import { NoteState } from '../enums/NoteState';

const EMPTY_TEXT = '';

export interface IServerNote {
  readonly text: string;
  readonly id: Guid;
  readonly creationDate: Date;
  readonly lastModificationDate: Date;
}

interface INote {
  readonly visibleText: string;
  readonly id: Guid;
  readonly noteState: NoteState;
  readonly serverSynchronizedText: string;
  readonly errorId?: Guid;
}

const defaultNote: INote = {
  visibleText: EMPTY_TEXT,
  id: '00000000-0000-0000-0000-000000000000',
  noteState: NoteState.ACTIVE,
  serverSynchronizedText: EMPTY_TEXT,
  errorId: undefined,
};

export class Note extends AbstractRecord(defaultNote) implements INote {
  readonly serverSynchronizedText: string;
  readonly visibleText: string;
  readonly id: Guid;
  readonly noteState: NoteState;
  readonly errorId?: Guid;
}
