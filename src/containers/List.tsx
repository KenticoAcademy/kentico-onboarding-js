import { connect, Dispatch } from 'react-redux';

import { getMemoizedKeys } from '../selectors/memorySelector';
import { getItems } from '../actions';
import {
  IListDispatchProps,
  IListStateProps,
  List as ListComponent,
} from '../components/List';
import { IState } from '../store/IState';

const mapStateToProps = ({ list }: IState): IListStateProps => ({
  itemKeys: getMemoizedKeys(list.items.keySeq()),
  dataLoaded: list.dataLoaded,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>): IListDispatchProps => ({
  getItems: () => dispatch(getItems()),
});

export const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
