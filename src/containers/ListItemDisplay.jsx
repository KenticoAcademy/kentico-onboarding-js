import { connect } from 'react-redux';

import { ListItemDisplay as ListItemDisplayComponent } from '../components/ListItemDisplay';
import { startItemEditing } from '../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { key } }) => ({
  startEditing: () => dispatch(startItemEditing(key)),
});

export const ListItemDisplay = connect(null, mapDispatchToProps)(ListItemDisplayComponent);
