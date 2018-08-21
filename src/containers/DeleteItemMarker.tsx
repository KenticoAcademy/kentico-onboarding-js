import { connect } from 'react-redux';
import { DeleteItemMarker as DeleteItemMarkerComponent } from '../components/DeleteItemMarker';
import { IAction } from '../actions/IAction';
import {
  removeItem,
} from '../actions';
import { ItemId } from '../models/ItemId';

export interface IDeleteItemMarkerContainerProps {
  id: ItemId;
}

export interface IDeleteItemMarkerCallbackProps {
  onThrowAway: () => Promise<IAction>;
}

const mapDispatchToProps = (dispatch: Function, { id }: IDeleteItemMarkerContainerProps): IDeleteItemMarkerCallbackProps => ({
  onThrowAway: () => removeItem(dispatch)(id),
});

export const DeleteItemMarker = connect(null, mapDispatchToProps)(DeleteItemMarkerComponent);

