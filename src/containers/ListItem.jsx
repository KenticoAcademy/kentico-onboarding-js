import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';

const mapStateToProps = (state, { itemKey }) => ({
  item: state.items.get(itemKey),
});

export const ListItem = connect(mapStateToProps)(ListItemComponent);
