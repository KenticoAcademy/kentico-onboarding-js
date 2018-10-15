import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IListItemDataProps,
  ListItem as ListItemComponent
} from '../../components/Items/ListItem';
import { IAppState } from '../../reducers/IAppState';
import { ItemId } from '../../models/ItemId';
import { IAction } from '../../actions/IAction';
import { Dispatch } from 'redux';
import {toggleEditing} from '../../actions/simpleActions/toggleEditing';

export interface IListItemContainerProps {
  id: ItemId;
  index: number;
}

export interface IListItemCallbackProps {
  onClick: () => IAction;
}

const mapStateToProps = (state: IAppState, {id, index}: IListItemContainerProps): IListItemDataProps => {
  const item = state.items.byId.get(id);
  return ({
    item: item,
    index,
    synchronizing: !item.synchronized && item.errorMessages.size === 0,
    errorsNotEmpty: item.errorMessages.size !== 0,
  });
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IListItemContainerProps): IListItemCallbackProps => ({
  onClick: () => dispatch(toggleEditing(id)),
});

export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
