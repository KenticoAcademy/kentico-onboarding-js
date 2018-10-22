import {connect} from 'react-redux';
import {
  DeleteItemMarker as DeleteItemMarkerComponent,
  IDeleteItemMarkerDispatchProps,
} from '../../components/Markers/DeleteItemMarker';
import {IAction} from '../../actions/IAction';
import {CreateRemoveItem} from '../../actions';
import {Dispatch} from 'redux';


export interface IDeleteItemMarkerContainerProps {
  id: ItemId;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>,
  {id}: IDeleteItemMarkerContainerProps): IDeleteItemMarkerDispatchProps => ({
  onThrowAway: () => dispatch(CreateRemoveItem(id)),
});

const mergeProps = (_: null, propsFromDispatch: IDeleteItemMarkerDispatchProps) => ({
  ...propsFromDispatch,
});

export const DeleteItemMarker = connect(null, mapDispatchToProps, mergeProps)(DeleteItemMarkerComponent);

