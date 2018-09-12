import { connect } from 'react-redux';
import { DeleteItemMarker as DeleteItemMarkerComponent } from '../../components/Markers/DeleteItemMarker';
import { IAction } from '../../actions/IAction';
import { removeItem, } from '../../actions';
import { ItemId } from '../../models/ItemId';
import { Dispatch } from 'redux';

export interface IDeleteItemMarkerContainerProps {
  id: ItemId;
}

export interface IDeleteItemMarkerCallbackProps {
  onThrowAway: () => Promise<IAction>;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IDeleteItemMarkerContainerProps): IDeleteItemMarkerCallbackProps => ({
  onThrowAway: () => dispatch(removeItem(id)),
});

export const DeleteItemMarker = connect(null, mapDispatchToProps)(DeleteItemMarkerComponent);
