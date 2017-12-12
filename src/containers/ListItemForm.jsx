import { connect } from 'react-redux';
import { ListItemForm as ListItemFormComponent } from '../components/ListItemForm';
import {
  deleteItem,
  cancelItemChanges,
  saveItemChanges,
} from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: newText => dispatch(saveItemChanges(
    ownProps.item.id,
    newText,
  )),
  onDelete: () => dispatch(deleteItem(
    ownProps.item.id,
  )),
  onCancel: () => dispatch(cancelItemChanges(
    ownProps.item.id,
  )),
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

export const ListItemForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemFormComponent);
