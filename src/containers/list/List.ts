import { connect } from 'react-redux';
import { IListDispatchProps, IListStateProps, List as ListComponent } from '../../components/list/List';
import { getMemoizedIds } from '../../utils/getMemoizedIds';
import { IStore } from '../../store/types/IStore';
import { ComponentClass } from 'react';
import { Dispatch } from '../../actions/types/Dispatcher';
import { getItems } from '../../actions/listActions';

const mapStateToProps = (state: IStore): IListStateProps => ({
  items: getMemoizedIds(state.items.keySeq().toArray()),
  isFetching: state.isFetching,
  fetchingItemsFail: state.fetchingItemsFail,
});

const mapDispatchToProps = (dispatch: Dispatch): IListDispatchProps => ({
  initItems: () => dispatch(getItems()),
});

export const List: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
