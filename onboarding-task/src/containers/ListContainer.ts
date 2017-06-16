import * as React from 'react';
import { connect } from 'react-redux';
import { List } from '../components/List';
import { fetchItems, postItem } from '../actionCreators/actionCreators';
import { IAppState } from '../reducers/IAppState';
import { IListDataProps, IListCallbackProps } from '../components/List';

interface IListContainerProps {}

const mapStateToProps = (state: IAppState): IListDataProps => ({
  itemIds: state.itemIds,
  isFetching: state.isFetching,
  errorIds: state.errorIds,
});

const mapDispatchToProps = (dispatch: Dispatch): IListCallbackProps => ({
  onAddItem: (text: string) => postItem(text)(dispatch),
  fetchItems: () => fetchItems(dispatch),
});

const ListContainer: React.ComponentClass<IListContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
