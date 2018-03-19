import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import { ItemViewModel } from '../models/itemViewModel';

const mapStateToProps = (state, { itemKey, bullet }) => ({
  item: new ItemViewModel(state.items.get(itemKey).toJS(), bullet),
});

export const ListItem = connect(mapStateToProps)(ListItemComponent);
