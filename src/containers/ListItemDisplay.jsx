import { connect } from 'react-redux';

import { ListItemDisplay as ListItemDisplayComponent } from '../components/ListItemDisplay';
import { startItemEditing } from '../actions/itemActions';

const mapStateToProps = (state, { bullet, itemValue }) => ({
  itemValue,
  bullet,
});

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  startEditing: () => dispatch(startItemEditing(itemKey)),
});

export const ListItemDisplay = connect(mapStateToProps, mapDispatchToProps)(ListItemDisplayComponent);
