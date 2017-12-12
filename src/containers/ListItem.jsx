import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  deleteItem,
  cancelItemChanges,
  saveItemChanges,
  openItemForEditing,
} from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: newText => dispatch(saveItemChanges(
    ownProps.item.id,
    newText,
  )),
  onDelete: () => dispatch(deleteItem(
    ownProps.item.id,
  )),
  onItemOpened: () => dispatch(openItemForEditing(
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

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemComponent);
