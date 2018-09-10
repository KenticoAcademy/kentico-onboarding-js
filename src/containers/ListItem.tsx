import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IListItemDataProps,
  ListItem as ListItemComponent
} from '../components/ListItem';
import { IAppState } from '../reducers/IAppState';
import { ItemId } from '../models/ItemId';
import { IAction } from '../actions/IAction';
import { removeItem } from '../actions';
import { updateItem } from '../actions';
import { resetItem } from '../actions/simpleActions/resetItem';
import { uploadItemAgain } from '../actions';
import { errorMessageTypes } from '../constants/errorMessageTypes';
import { Dispatch } from 'redux';

export interface IListItemContainerProps {
  id: ItemId;
  index: number;
}

export interface IListItemCallbackProps {
  onThrowAway: () => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
  onUploadAgain: (text: string) => Promise<IAction>;
  onRecover: () => IAction;
}

const mapStateToProps = (state: IAppState, {id, index}: IListItemContainerProps): IListItemDataProps => ({
  item: state.items.byId.get(id),
  index,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, { id }: IListItemContainerProps): IListItemCallbackProps => ({
  onThrowAway: () => removeItem(dispatch)(id),
  onSaveAgain: (text: string) => updateItem(dispatch)(id, text),
  onUploadAgain: (text: string) => uploadItemAgain(id)(dispatch)(text),
  onRecover: () => dispatch(resetItem(id, [errorMessageTypes.DELETE])),
});

export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
