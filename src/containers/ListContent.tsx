import { connect } from 'react-redux';

import { getMemoizedKeys } from '../selectors/memorySelector';
import {
  IListContentStateProps,
  ListContent as ListContentComponent,
} from '../components/ListContent';
import { IState } from '../store/IState';

const mapStateToProps = ({ list }: IState): IListContentStateProps => ({
  itemKeys: getMemoizedKeys(list.items.keySeq()),
});

export const ListContent = connect(mapStateToProps)(ListContentComponent);
