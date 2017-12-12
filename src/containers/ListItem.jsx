import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem.jsx';

const mapStateToProps = (state, { itemId }) => ({
  id: itemId,
  isBeingEdited: state.items.byId.get(itemId).isBeingEdited,
});

export const ListItem = connect(mapStateToProps)(ListItemComponent);
