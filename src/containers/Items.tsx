import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IItemsDataProps,
  Items as ItemsComponent,
} from '../components/Items';
import { IAppState } from '../models/state/IAppState';
import { keySeqToArray } from '../utils/keySeqToArray';

const mapStateToProps = ({ list }: IAppState): IItemsDataProps => ({
  itemsSyncInfo: keySeqToArray(list.itemsSyncInfo.valueSeq()),
});

export const Items: ComponentClass = connect(
  mapStateToProps,
)(ItemsComponent);
