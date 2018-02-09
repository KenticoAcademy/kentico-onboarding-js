import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IItemsDataProps,
  Items as ItemsComponent,
} from '../components/Items';
import { IAppState } from '../models/interfaces/IAppState';
import { keySeqToArray } from '../utils/keySeqToArray';

const mapStateToProps = (state: IAppState): IItemsDataProps => ({
  itemIds: keySeqToArray(state.list.items.keySeq()),
});

export const Items: ComponentClass = connect(
  mapStateToProps,
)(ItemsComponent);
