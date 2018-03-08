import { connect } from 'react-redux';

import { ListItemDisplay as ListItemDisplayComponent } from '../components/ListItemDisplay';
import { startItemEditing } from '../actions';

const mapStateToProps = (state, { bullet, itemValue }) => ({
  itemValue,
  bullet,
});

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  onItemEdit: () => dispatch(startItemEditing(itemKey)),
});

export const ListItemDisplay = connect(mapStateToProps, mapDispatchToProps)(ListItemDisplayComponent);
