import { connect } from 'react-redux';
import {
  IListDataProps,
  List as ListComponent
} from '../../components/notesApplication/List';
import { getAllIds } from '../../selectors/notes/list/listOfNotes';
import { IStoreState } from '../../reducers/IStoreState';

const mapStateToProps = ({ notes }: IStoreState): IListDataProps => ({
  notesIds: getAllIds(notes.listOfNotes),
});

export const List = connect(
  mapStateToProps,
)(ListComponent);
