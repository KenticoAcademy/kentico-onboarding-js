import {
  connect,
  Dispatch
} from 'react-redux';
import {
  AddNote as AddNoteComponent,
  IAddNoteCallbacksProps,
  IAddNoteDataProps
} from '../../../components/notesApplication/addNote/AddNote';
import { IStoreState } from '../../../reducers/IStoreState';
import {
  addNewNote,
  changeAddingNoteText,
  startAddingNote,
  stopAddingNote
} from '../../../actions';

const mapStateToProps = ({ notes }: IStoreState): IAddNoteDataProps => ({
  isInputFocused: notes.isAddingNote,
  text: notes.addNoteText,
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IAddNoteCallbacksProps => ({
  onAddClick: (insertedText: string) =>
    dispatch(addNewNote(insertedText)),
  onInputFocus: () =>
    dispatch(startAddingNote()),
  onInputBlur: () =>
    dispatch(stopAddingNote()),
  updateInsertedText: (newText: string) =>
    dispatch(changeAddingNoteText(newText)),
});

export const AddNote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNoteComponent);
