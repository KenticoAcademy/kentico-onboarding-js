import { connect } from 'react-redux';

import { ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import {
  deleteItem,
  toggleItemEditing,
} from '../actions';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  bullet: ownProps.bullet,
});

const mapDispatchToProps = (dispatch, { item }) => ({
  onCancel: () => dispatch(toggleItemEditing(item)),
  onDelete: () => dispatch(deleteItem(item)),
});

export const ListItemEditor = connect(mapStateToProps, mapDispatchToProps)(ListItemEditorComponent);
