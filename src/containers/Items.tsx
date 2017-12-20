import { connect } from 'react-redux';
import { Items as ItemsComponent } from '../components/Items';
import { IAppState } from '../interfaces/IAppState';
import { keySeqToArray } from '../utils/keySeqToArray';

const mapStateToProps = (state: IAppState) => ({
  itemIds: keySeqToArray(state.list.items.keySeq()),
});

export const Items = connect(
  mapStateToProps,
)(ItemsComponent);
