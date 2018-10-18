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

export interface IRetryMarkerContainerProps {
  id: ItemId;
}

const mapStateToProps = (state: IAppState, {id}: IRetryMarkerContainerProps): IRetryMarkerStateProps => {
  const item = state.items.byId.get(id);
  return {
    text: item.text,
    textUpdate: item.textUpdate,
    errorMessages: item.errorMessages,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IRetryMarkerContainerProps): IRetryMarkerDispatchProps => ({
  onSaveAgain: (text: string) => dispatch(CreateUpdateItem(id, text)),
  onUploadAgain: (text: string) => dispatch(CreateUploadItemAgain(() => id)(text)),
});


export const RetryMarker: ComponentClass<IRetryMarkerContainerProps> = connect(mapStateToProps, mapDispatchToProps)(RetryMarkerComponent);
