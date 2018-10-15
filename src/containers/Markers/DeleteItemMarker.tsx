import { connect } from 'react-redux';
import {
  DeleteItemMarker as DeleteItemMarkerComponent,
  IDeleteItemMarkerDispatchProps,
} from '../../components/Markers/DeleteItemMarker';
import { IAction } from '../../actions/IAction';
import { CreateRemoveItem, } from '../../actions';
import { ItemId } from '../../models/ItemId';
import { Dispatch } from 'redux';
import { assertAlert } from '../../utils/assertAlert';

export interface IDeleteItemMarkerContainerProps {
  id: ItemId;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IDeleteItemMarkerContainerProps): IDeleteItemMarkerDispatchProps => ({
  onThrowAway: () => dispatch(CreateRemoveItem(id)),
  assertAlert: (type, message) =>  assertAlert(type, message),
});

export const DeleteItemMarker = connect(null, mapDispatchToProps)(DeleteItemMarkerComponent);

