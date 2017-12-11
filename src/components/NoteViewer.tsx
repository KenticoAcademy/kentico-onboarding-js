import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface INoteViewerDataProps {
  readonly note: {
    readonly text: string;
    readonly isEditActive: boolean;
 };
  readonly number: number;
}

export interface INoteViewerCallbacksProps {
  readonly onTextClick: () => void;
}

type NoteViewerProps = INoteViewerDataProps & INoteViewerCallbacksProps;

const NoteViewer: React.StatelessComponent<NoteViewerProps>  = (props: NoteViewerProps): JSX.Element => (
  <p onClick={props.onTextClick}>{props.number + '. ' + props.note.text}</p>
);

NoteViewer.displayName = 'NoteViewer';

NoteViewer.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { NoteViewer };
