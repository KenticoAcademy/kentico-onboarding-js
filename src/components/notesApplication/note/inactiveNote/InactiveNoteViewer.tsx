import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MdAutorenew } from 'react-icons/lib/md';
import { NotePropType } from '../../../../utils/notePropType';
import { Note } from '../../../../models/Note';
import '../../../../styles/noteViewer.css';

export interface InactiveNoteViewerDataProps {
  readonly note: Note;
  readonly number: number;
}

type InactiveNoteViewerProps = InactiveNoteViewerDataProps;

const InactiveNoteViewer: React.StatelessComponent<InactiveNoteViewerProps> = (props: InactiveNoteViewerProps): JSX.Element => (
  <p className="inactive-line">
    {props.number + '. ' + props.note.visibleText}
    <MdAutorenew
      className="pull-right refresh-animate"
      size="25"
      color="DeepSkyBlue"
    />
  </p>
);

InactiveNoteViewer.displayName = 'InactiveNote';

InactiveNoteViewer.propTypes = {
  note: NotePropType,
  number: PropTypes.number.isRequired,
};

export { InactiveNoteViewer };
