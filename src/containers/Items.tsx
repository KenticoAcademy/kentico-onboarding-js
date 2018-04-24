import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IItemsDataProps,
  Items as ItemsComponent,
} from '../components/Items';
import { IAppState } from '../models/state/IAppState';
import { indexedSequenceToArray } from '../utils/indexedSequenceToArray';

const mapStateToProps = ({ list }: IAppState): IItemsDataProps => ({
  itemsSyncInfo: indexedSequenceToArray(list.itemsSyncInfo.valueSeq()),
});

export const Items: ComponentClass = connect(
  mapStateToProps,
)(ItemsComponent);
