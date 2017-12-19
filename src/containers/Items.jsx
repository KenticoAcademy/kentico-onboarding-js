import { connect } from 'react-redux';
import { Items as ItemsComponent } from '../components/Items';
import { keySeqToArray } from '../utils/keySeqToArray';

const mapStateToProps = state => ({
  itemIds: keySeqToArray(state.list.items.keySeq()),
});

export const Items = connect(
  mapStateToProps,
)(ItemsComponent);
