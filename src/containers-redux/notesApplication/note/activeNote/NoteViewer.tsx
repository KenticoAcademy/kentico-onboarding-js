import {
  connect,
  Dispatch
} from 'react-redux';
import { startEditingNote } from '../../../../actions/index';
import {
  NoteViewer as NoteViewerComponent,
  INoteViewerCallbacksProps,
  INoteViewerDataProps
} from '../../../../components/notesApplication/note/activeNote/NoteViewer';
import { IStoreState } from '../../../../reducers/IStoreState';
import { IAction } from '../../../../actions/IAction';
import { getErrorById } from '../../../../selectors/errors/getErrorById';
import { ApplicationError } from '../../../../models/ApplicationError';
import { Note } from '../../../../models/Note';

interface IOwnProps {
  readonly note: Note;
  readonly number: number;
}

const mapStateToProps = ({ errors }: IStoreState, ownProps: IOwnProps): INoteViewerDataProps => {
  return {
    ...ownProps,
    error: ownProps.note.errorId === undefined ? new ApplicationError() : getErrorById(errors, ownProps.note.errorId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IOwnProps): INoteViewerCallbacksProps => ({
  onTextClick: () =>
    dispatch(startEditingNote(ownProps.note.id)),
});

export const NoteViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteViewerComponent);
