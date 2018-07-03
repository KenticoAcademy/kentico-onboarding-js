import { connect } from 'react-redux';

import { getMemoizedKeys } from '../selectors/memorySelector';
import {
  IListStateProps,
  List as ListComponent,
} from '../components/List';
import { IState } from '../store/IState';

const mapStateToProps = ({ list }: IState): IListStateProps => ({
  itemKeys: getMemoizedKeys(list.items.keySeq()),
});

export const List: React.ComponentClass
  = connect<IListStateProps, undefined>(mapStateToProps)(ListComponent);
