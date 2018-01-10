import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import { IListDataProps, List as ListComponent } from '../components/List';
import { IAppState } from '../models/IAppState';
import { IAction } from '../models/IAction';
import { Dispatch } from 'redux';
import { fetchItems } from '../actions/thunk';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  fetchItemsState: state.list.fetchItemsState,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  fetchItems: (uri: string) =>
    fetchItems(uri)(dispatch)
});

export const List: ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListComponent);
