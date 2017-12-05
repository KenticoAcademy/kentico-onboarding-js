import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';

const mapStateToProps = (state, { itemId }) => ({
  id: itemId,
  isBeingEdited: state.itemsById.get(itemId).isBeingEdited,
});

export const ListItem = connect(mapStateToProps, null)(ListItemComponent);
