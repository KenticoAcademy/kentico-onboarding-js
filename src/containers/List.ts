import { connect } from 'react-redux';
import { getItemsIds } from '../selectors/getItemsIds';
import { IListStateProps, List as ListComponent } from '../components/List';
import { IStore } from '../store/IAppState';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore): IListStateProps => ({
  itemsIds: getItemsIds(state.todoList.items.keySeq().toArray()),
});

export const List: ComponentClass = connect(mapStateToProps)(ListComponent);
