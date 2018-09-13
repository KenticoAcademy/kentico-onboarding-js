import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IListItemDataProps,
  ListItem as ListItemComponent
} from '../../components/Items/ListItem';
import { IAppState } from '../../reducers/IAppState';
import { ItemId } from '../../models/ItemId';
import { IAction } from '../../actions/IAction';
import {
  CreateRemoveItem,
  CreateUpdateItem,
  CreateUploadItemAgain
} from '../../actions/index';
import { resetItem } from '../../actions/simpleActions/resetItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { Dispatch } from 'redux';
import { assertAlert } from '../../utils/assertAlert';
import { alertTypes } from '../../constants/alert/alertTypes';
import { alertMessages } from '../../constants/alert/alertMessages';

export interface IListItemContainerProps {
  id: ItemId;
  index: number;
}

export interface IListItemCallbackProps {
  onThrowAway: () => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
  onUploadAgain: (text: string) => Promise<IAction>;
  onRecover: () => IAction;
  assertAlert: (type: alertTypes, message: alertMessages) => number;
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
  onThrowAway: () => dispatch(CreateRemoveItem(id)),
  onSaveAgain: (text: string) => dispatch(CreateUpdateItem(id, text)),
  onUploadAgain: (text: string) => dispatch(CreateUploadItemAgain(() => id)(text)),
  onRecover: () => dispatch(resetItem(id, [errorMessageTypes.DELETE])),
  assertAlert: (type, message) =>  assertAlert(type, message),
});

export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
