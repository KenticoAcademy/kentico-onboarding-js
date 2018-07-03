import { connect, Dispatch } from 'react-redux';

import { getItems } from '../actions';
import {
  IListDispatchProps,
  IListStateProps,
  List as ListComponent,
} from '../components/List';
import { IState } from '../store/IState';

const mapStateToProps = ({ list }: IState): IListStateProps => ({
  dataLoaded: list.dataLoaded,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>): IListDispatchProps => ({
  getItems: () => dispatch(getItems()),
});

export const List: React.ComponentClass
  = connect<IListStateProps, IListDispatchProps>(mapStateToProps, mapDispatchToProps)(ListComponent);
