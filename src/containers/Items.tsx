import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IItemsDataProps,
  Items as ItemsComponent,
} from '../components/Items';
import { IAppState } from '../models/state/IAppState';
import { keySeqToArray } from '../utils/keySeqToArray';

const mapStateToProps = (state: IAppState): IItemsDataProps => ({
  itemsSyncInfo: keySeqToArray(state.list.items.keySeq())
    .map(id => state.list.itemsSyncInfo.get(id)),
});

export const Items: ComponentClass = connect(
  mapStateToProps,
)(ItemsComponent);
