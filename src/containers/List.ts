import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  IListDataProps,
  List as ListComponent,
} from '../components/List';
import { IAppState } from '../models/interfaces/IAppState';
import { IAction } from '../models/interfaces/IAction';
import { Dispatch } from 'redux';
import { fetchItemsAsync } from '../actions/thunk';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  fetchItemsState: state.list.fetchItemsState,
  message: state.list.message,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  fetchItems: (uri: string) =>
    fetchItemsAsync(uri)(dispatch)
});

export const List: ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListComponent);
