import { connect } from 'react-redux';

import { ListItemDisplay as ListItemDisplayComponent } from '../components/ListItemDisplay';
import { toggleItemEditing } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  bullet: ownProps.bullet,
});

const mapDispatchToProps = (dispatch, { item }) => ({
  onItemEdit: () => dispatch(toggleItemEditing(item)),
});

export const ListItemDisplay = connect(mapStateToProps, mapDispatchToProps)(ListItemDisplayComponent);
