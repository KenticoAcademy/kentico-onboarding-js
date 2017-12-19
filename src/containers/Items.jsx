import { connect } from 'react-redux';
import { Items as ItemsComponent } from '../components/Items';

const mapStateToProps = state => ({
  itemIds: state.list.items.keySeq().toArray(),
});

export const Items = connect(
  mapStateToProps,
)(ItemsComponent);
