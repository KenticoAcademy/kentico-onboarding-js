import { connect } from 'react-redux';

import { ListItemDisplay as ListItemDisplayComponent } from '../components/ListItemDisplay';
import { startItemEditing } from '../actions';

const mapDispatchToProps = (dispatch, { item: { key } }) => ({
  onEdit: () => dispatch(startItemEditing(key)),
});

export const ListItemDisplay = connect(null, mapDispatchToProps)(ListItemDisplayComponent);
