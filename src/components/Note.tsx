import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NoteEditor } from '../containers-redux/NoteEditor';
import { NoteViewer } from '../containers-redux/NoteViewer';

export interface INoteDataProps {
  readonly noteIsEditActive: boolean;
  readonly noteId: Guid;
  readonly number: number;
}

const Note: React.StatelessComponent<INoteDataProps> = (props: INoteDataProps): JSX.Element => {
  const NoteComponent = props.noteIsEditActive
    ? NoteEditor
    : NoteViewer;

  return <NoteComponent
    noteId={props.noteId}
    number={props.number}
  />;
};

Note.displayName = 'Note';

Note.propTypes = {
  noteIsEditActive: PropTypes.bool.isRequired,
  noteId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export { Note };
