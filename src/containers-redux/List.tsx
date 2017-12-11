import { connect } from 'react-redux';
import {
  IListDataProps,
  List as ListComponent
} from '../components/List';
import { getAllIds } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = ({ notes }: IStoreState): IListDataProps => ({
  notesIds: getAllIds(notes.listOfNotes),
});

export const List = connect(
  mapStateToProps,
)(ListComponent);
