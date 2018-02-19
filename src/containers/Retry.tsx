import * as PropTypes from 'prop-types';
import {
  ComponentClass,
  connect,
  Dispatch
} from 'react-redux';
import { IListItem } from '../models/interfaces/IListItem';
import {
  Retry as RetryComponent,
  IRetryCallbackProps,
  IRetryProps
} from '../components/Retry';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncOperation } from '../models/enums/SyncOperation';
import {
  deleteItemAsync,
  postItemAsync,
  retryActionAsync,
  saveNewTextAsync
} from '../actions/thunk';
import { IAction } from '../models/interfaces/IAction';

export interface IRetryContainerProps {
  readonly item: IListItem;
  readonly itemSyncInfo: IItemSyncInfo;
}

const propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const getRetryAction = ({ id, text }: IListItem, itemSyncInfo: IItemSyncInfo) => {
  switch (itemSyncInfo.operation) {
    case SyncOperation.Add:
      return retryActionAsync(postItemAsync)({
        uri: itemSyncInfo.uri,
        text,
        givenId: id,
      });

    case SyncOperation.Modify:
      return retryActionAsync(saveNewTextAsync)({
        id,
        uri: itemSyncInfo.uri,
        text,
      });

    case SyncOperation.Delete:
      return retryActionAsync(deleteItemAsync)({
        id,
        uri: itemSyncInfo.uri,
      });

    default:
      return () => undefined;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>,  { item, itemSyncInfo }: IRetryContainerProps): IRetryCallbackProps => ({
  retryAction: () =>
    dispatch(
      (getRetryAction(item, itemSyncInfo) as any)),
});

const mergeProps = (_: undefined, { retryAction }: IRetryCallbackProps, { itemSyncInfo }: IRetryContainerProps): IRetryProps => ({
  retryAction,
  description: `${itemSyncInfo.operation} failed`,
});

const Retry: ComponentClass<IRetryContainerProps> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps,
)(RetryComponent);

Retry.propTypes = propTypes;

export { Retry };
