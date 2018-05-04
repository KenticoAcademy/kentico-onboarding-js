import * as PropTypes from 'prop-types';
import { NoteState } from '../enums/NoteState';

export const NoteStatePropType = PropTypes.oneOf([
  NoteState.INACTIVE_ERROR,
  NoteState.ACTIVE,
  NoteState.EDITOR,
  NoteState.COMMUNICATING,
]).isRequired;

export const NotePropType = PropTypes.shape({
  visibleText: PropTypes.string.isRequired,
  serverSynchronizedText: PropTypes.string.isRequired,
  noteState: NoteStatePropType,
}).isRequired;
