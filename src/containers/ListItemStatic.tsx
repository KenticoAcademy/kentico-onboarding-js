import {
  connect,
  ComponentClass,
} from 'react-redux';
import {
  IListItemStaticCallbackProps,
  IListItemStaticOwnProps,
  ListItemStatic as ListItemStaticComponent,
  listItemStaticPropTypes,
} from '../components/ListItemStatic';
import { Dispatch } from 'redux';
import { changeItemOpenState } from '../actions';
import { IAction } from '../models/interfaces/IAction';
import { SyncState } from '../models/enums/SyncState';
import { SyncOperation } from '../models/enums/SyncOperation';

const mapDispatchToProps = (dispatch: Dispatch<IAction>, { item }: IListItemStaticOwnProps): IListItemStaticCallbackProps => ({
  onItemOpened: () => dispatch(changeItemOpenState(item.id)),
});

const mergeProps = (_: undefined, dispatchProps: IListItemStaticCallbackProps, ownProps: IListItemStaticOwnProps) => ({
  ...dispatchProps,
  ...ownProps,
  isClickable:
    !(
      ownProps.itemSyncInfo.syncState === SyncState.Pending
      || (
        ownProps.itemSyncInfo.syncState === SyncState.Desynced
        && (
          ownProps.itemSyncInfo.operation === SyncOperation.Delete
          || ownProps.itemSyncInfo.operation === SyncOperation.DeleteAfterFailedModify
        )
      )
    ),
});

const ListItemStatic: ComponentClass<IListItemStaticOwnProps> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = listItemStaticPropTypes;

export { ListItemStatic };
