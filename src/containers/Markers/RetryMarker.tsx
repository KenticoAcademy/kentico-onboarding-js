import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IRetryMarkerDispatchProps,
  IRetryMarkerStateProps,
  RetryMarker as RetryMarkerComponent
} from '../../components/Markers/RetryMarker';
import { IAppState } from '../../reducers/IAppState';
import {
  CreateUpdateItem,
  CreateUploadItemAgain
} from '../../actions';
import { IAction } from '../../actions/IAction';
import { Dispatch } from 'redux';
import {errorMessageTypes} from '../../constants/errorMessageTypes';
import {IItem} from '../../models/Item';

export enum statusOfItemToBeProcessed {
  NEW_MODIFIED = 'NEW_MODIFIED',
  NEW_CONSISTENT = 'NEW_CONSISTENT',
  EXISTING_MODIFIED = 'EXISTING_MODIFIED',
}

export interface IRetryMarkerContainerProps {
  id: ItemId;
}

function getItemStatus(item: IItem): statusOfItemToBeProcessed  {
  if (item.errorMessages.keySeq().contains(errorMessageTypes.UPLOAD)) {
    if (item.textUpdate) {
      return statusOfItemToBeProcessed.NEW_MODIFIED;
    } else {
      return statusOfItemToBeProcessed.NEW_CONSISTENT;
    }
  } else {
    return statusOfItemToBeProcessed.EXISTING_MODIFIED;
  }
}

const mapStateToProps = (state: IAppState, {id}: IRetryMarkerContainerProps): IRetryMarkerStateProps => {
  const item = state.items.byId.get(id);

  return {
    text: item.text,
    textUpdate: item.textUpdate,
    itemToBeProcessed: getItemStatus(item),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IRetryMarkerContainerProps): IRetryMarkerDispatchProps => ({
  onSaveAgain: (text: string) => dispatch(CreateUpdateItem(id, text)),
  onUploadAgain: (text: string) => dispatch(CreateUploadItemAgain(() => id)(text)),
});


export const RetryMarker: ComponentClass<IRetryMarkerContainerProps> = connect(mapStateToProps, mapDispatchToProps)(RetryMarkerComponent);
