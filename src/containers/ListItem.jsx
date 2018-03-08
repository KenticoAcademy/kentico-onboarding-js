import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';

const mapStateToProps = (state, ownProps) => ({
  itemValue: ownProps.item.changedValue,
  itemKey: ownProps.itemKey,
  bullet: ownProps.bullet,
  item: ownProps.item,
});

export const ListItem = connect(mapStateToProps)(ListItemComponent);
