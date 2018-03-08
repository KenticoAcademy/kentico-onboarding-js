import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';

const mapStateToProps = (state, { item, itemKey, bullet }) => ({
  itemValue: item.changeableValue,
  isBeingEdited: item.isBeingEdited,
  itemKey,
  bullet,
});

export const ListItem = connect(mapStateToProps)(ListItemComponent);
