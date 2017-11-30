import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import {
  toggleEditing,
} from '../actions/actionCreators';

const mapStateToProps = (state) => ({
  itemsMap: state.items.byId,
});

const mapDispatchToProps = (dispatch, { itemId }) => ({
  toggleEditing: () => dispatch(toggleEditing(itemId)),
});

export const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
