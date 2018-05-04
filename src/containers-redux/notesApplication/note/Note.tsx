import { connect } from 'react-redux';
import {
  Note as NoteComponent,
  INoteDataProps
} from '../../../components/notesApplication/note/Note';
import { getNoteById } from '../../../selectors/notes/list/listOfNotes';
import { IStoreState } from '../../../reducers/IStoreState';

interface INoteOwnProps {
  readonly noteId: Guid;
  readonly number: number;
}

const mapStateToProps = ({ notes }: IStoreState, ownProps: INoteOwnProps): INoteDataProps => ({
  note: getNoteById(notes.listOfNotes, ownProps.noteId),
  number: ownProps.number,
});

export const Note = connect(
  mapStateToProps,
)(NoteComponent);
