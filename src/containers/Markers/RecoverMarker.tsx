import { connect } from 'react-redux';
import {
  IRecoverMarkerDispatchProps,
  RecoverMarker as RecoverMarkerComponent,
} from '../../components/Markers/RecoverMarker';
import { ItemId } from '../../models/ItemId';
import { resetItem } from '../../actions/simpleActions/resetItem';
import { errorMessageTypes } from '../../constants/errorMessageTypes';

export interface IRecoverMarkerContainerProps {
  id: ItemId;
}

const mapDispatchToProps = (dispatch: Function, {id}: IRecoverMarkerContainerProps): IRecoverMarkerDispatchProps => ({
  onRecover: () => dispatch(resetItem(id, [errorMessageTypes.DELETE])),
});

export const RecoverMarker = connect(null, mapDispatchToProps)(RecoverMarkerComponent);

