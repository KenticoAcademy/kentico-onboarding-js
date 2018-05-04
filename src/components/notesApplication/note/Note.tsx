import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NoteEditor } from '../../../containers-redux/notesApplication/note/activeNote/NoteEditor';
import { NoteViewer } from '../../../containers-redux/notesApplication/note/activeNote/NoteViewer';
import { Note } from '../../../models/Note';
import { NotePropType } from '../../../utils/notePropType';
import { NoteState } from '../../../enums/NoteState';
import { InactiveNoteError } from '../../../containers-redux/notesApplication/note/inactiveNote/InactiveNoteError';
import { InactiveNoteViewer } from './inactiveNote/InactiveNoteViewer';

export interface INoteDataProps {
  readonly note: Note;
  readonly number: number;
}

const NoteComponent: React.StatelessComponent<INoteDataProps> = (props: INoteDataProps): JSX.Element | null => {
  let ReturnComponent;

  switch (props.note.noteState) {
    case NoteState.COMMUNICATING:
      ReturnComponent = InactiveNoteViewer;
      break;

    case NoteState.INACTIVE_ERROR:
      ReturnComponent = InactiveNoteError;
      break;

    case NoteState.EDITOR:
      ReturnComponent = NoteEditor;
      break;

    case NoteState.ACTIVE:
      ReturnComponent = NoteViewer;
      break;

    default:
      return null;
  }

  return <ReturnComponent
    note={props.note}
    number={props.number}
  />;
};

NoteComponent.displayName = 'Note';

NoteComponent.propTypes = {
  note: NotePropType,
  number: PropTypes.number.isRequired,
};

export { NoteComponent as Note };
