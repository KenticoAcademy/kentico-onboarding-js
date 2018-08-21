import { connect } from 'react-redux';
import { RecoverMarker as RecoverMarkerComponent } from '../components/RecoverMarker';
import { IAction } from '../actions/IAction';
import { ItemId } from '../models/ItemId';
import { resetItem } from '../actions/simpleActions/resetItem';
import { errorMessageTypes } from '../constants/errorMessageTypes';

export interface IRecoverMarkerContainerProps {
  id: ItemId;
}

export interface IRecoverMarkerCallbackProps {
  onRecover: () => Promise<IAction>;
}

const mapDispatchToProps = (dispatch: Function, { id }: IRecoverMarkerContainerProps): IRecoverMarkerCallbackProps => ({
  onRecover: () => dispatch(resetItem(id, [errorMessageTypes.DELETE])),
});

export const RecoverMarker = connect(null, mapDispatchToProps)(RecoverMarkerComponent);

