import { IStoreState } from '../../reducers/IStoreState';
import {
  connect,
  Dispatch
} from 'react-redux';
import { getAllNotes } from '../../actions/index';
import {
  IApplicationCallbacksProps,
  IApplicationDataProps,
  Application as NotesApplicationComponent
} from '../../components/notesApplication/Application';

const mapStateToProps = ({ notes }: IStoreState): IApplicationDataProps => ({
  isLoadingNotes: notes.loader.isLoadingNotes,
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IApplicationCallbacksProps => ({
  loadNotesFromServer: () =>
    dispatch(getAllNotes()),
});

export const NotesApplication = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesApplicationComponent);

