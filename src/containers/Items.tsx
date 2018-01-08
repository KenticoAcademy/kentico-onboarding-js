import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import { IItemsCallbackProps, IItemsDataProps, Items as ItemsComponent } from '../components/Items';
import { IAppState } from '../models/IAppState';
import { keySeqToArray } from '../utils/keySeqToArray';
import { Dispatch } from 'redux';
import { fetchItems } from '../actions/thunk';
import { IAction } from '../models/IAction';

const mapStateToProps = (state: IAppState): IItemsDataProps => ({
  itemIds: keySeqToArray(state.list.items.keySeq()),
  fetchItemsState: state.list.fetchItemsState,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IItemsCallbackProps => ({
  fetchItems: (uri: string) => fetchItems(uri)(dispatch),
});

export const Items: ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsComponent);
