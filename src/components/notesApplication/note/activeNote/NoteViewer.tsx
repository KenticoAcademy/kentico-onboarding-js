import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NotePropType } from '../../../../utils/notePropType';
import { ApplicationError } from '../../../../models/ApplicationError';
import { Note } from '../../../../models/Note';

export interface INoteViewerDataProps {
  readonly note: Note;
  readonly error: ApplicationError;
  readonly number: number;
}

export interface INoteViewerCallbacksProps {
  readonly onTextClick: () => void;
}

type NoteViewerProps = INoteViewerDataProps & INoteViewerCallbacksProps;

const NoteViewer: React.StatelessComponent<NoteViewerProps> = (props: NoteViewerProps): JSX.Element => (
    <p onClick={props.onTextClick}>{props.number + '. ' + props.note.visibleText}</p>
);

NoteViewer.displayName = 'NoteViewer';

NoteViewer.propTypes = {
  note: NotePropType,
  number: PropTypes.number.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { NoteViewer };
