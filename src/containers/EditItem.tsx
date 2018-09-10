import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../reducers/IState';
import {
  deleteItem,
  editItem,
} from '../actions/actionCreators';
import { EditItem as EditItemComponent } from '../components/EditItem';

const mapStateToProps = (state: IState, {id}: { id: string }) => ({
  text: state.items.get(id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: { id: string }) => ({
  onSave: (text: string) => dispatch(editItem(id, text)),
  onDelete: () => dispatch(deleteItem(id)),
});

export const EditItem = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);
