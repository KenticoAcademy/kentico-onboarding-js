import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../stores/IAppState';
import { IListCallbacksProps, IListDataProps, List } from '../components/List';
import { Dispatch } from '../stores/Dispatch';
import { postItem } from '../actions/actionCreators';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  itemsOrder: state.itemsOrder,
});


const mapDispatchToProps = (dispatch: Dispatch): IListCallbacksProps => ({
  onAddItem: (value: string) => dispatch(postItem(value)),
});


const ListContainer: React.ComponentClass<{}> = connect(mapStateToProps, mapDispatchToProps)(List);

export { ListContainer as List };
