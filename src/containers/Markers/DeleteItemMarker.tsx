import { connect } from 'react-redux';
import { DeleteItemMarker as DeleteItemMarkerComponent } from '../../components/Markers/DeleteItemMarker';
import { IAction } from '../../actions/IAction';
import { CreateRemoveItem, } from '../../actions';
import { ItemId } from '../../models/ItemId';
import { Dispatch } from 'redux';
import { assertAlert } from '../../utils/assertAlert';
import { alertTypes } from '../../constants/alert/alertTypes';
import { alertMessages } from '../../constants/alert/alertMessages';

export interface IDeleteItemMarkerContainerProps {
  id: ItemId;
}

export interface IDeleteItemMarkerCallbackProps {
  onThrowAway: () => Promise<IAction>;
  assertAlert: (type: alertTypes, message: alertMessages) => number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IDeleteItemMarkerContainerProps): IDeleteItemMarkerCallbackProps => ({
  onThrowAway: () => dispatch(CreateRemoveItem(id)),
  assertAlert: (type, message) =>  assertAlert(type, message),
});

export const DeleteItemMarker = connect(null, mapDispatchToProps)(DeleteItemMarkerComponent);

