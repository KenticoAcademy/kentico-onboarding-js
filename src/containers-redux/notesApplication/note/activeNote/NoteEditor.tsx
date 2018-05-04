import {
  connect,
  Dispatch
} from 'react-redux';
import {
  updateServerNote,
  cancelEditingNote,
  deleteServerNote,
} from '../../../../actions/index';
import {
  NoteEditor as NoteEditorComponent,
  INoteEditorCallbacksProps
} from '../../../../components/notesApplication/note/activeNote/NoteEditor';
import { IStoreState } from '../../../../reducers/IStoreState';
import { Note } from '../../../../models/Note';

interface INoteEditorOwnProps {
  readonly note: Note;
  readonly number: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>, ownProps: INoteEditorOwnProps): INoteEditorCallbacksProps => ({
  onDeleteClick: () =>
    dispatch(deleteServerNote(ownProps.note.id)),
  onCancelEditor: () =>
    dispatch(cancelEditingNote(ownProps.note.id)),
  onSaveClick: (currentNoteText: string) =>
    dispatch(updateServerNote(ownProps.note.id, currentNoteText)),
});

export const NoteEditor = connect(
  null,
  mapDispatchToProps
)(NoteEditorComponent);
