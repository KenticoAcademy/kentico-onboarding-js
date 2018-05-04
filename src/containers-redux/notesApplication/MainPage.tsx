import { connect } from 'react-redux';
import { IStoreState } from '../../reducers/IStoreState';
import {
  IMainPageDataProps,
  NotesMainPage as NotesMainPageComponent
} from '../../components/notesApplication/MainPage';

const mapStateToProps = ({ notes }: IStoreState): IMainPageDataProps => ({
  isLoading: notes.loader.isLoadingNotes,
  errorId: notes.loader.errorId,
});

export const NotesMainPage = connect(
  mapStateToProps,
)(NotesMainPageComponent);
