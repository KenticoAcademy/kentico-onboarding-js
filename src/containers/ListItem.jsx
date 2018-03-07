import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  bullet: ownProps.bullet,
});

export const ListItem = connect(mapStateToProps)(ListItemComponent);
