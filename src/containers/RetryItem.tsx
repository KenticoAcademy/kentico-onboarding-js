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
  editItemAsync
} from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';

export interface IRetryItemContainerProps {
  readonly item: IListItem;
  readonly itemSyncInfo: IItemSyncInfo;
}

const propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const getRetryAction = ({ id, text, syncedText }: IListItem, itemSyncInfo: IItemSyncInfo) => {
  switch (itemSyncInfo.operation) {
    case SyncOperation.Add:
      return postItemAsync({
        text,
        givenId: id,
      });

    case SyncOperation.Modify:
      return editItemAsync({
        id,
        text,
        syncedText,
      });

    case SyncOperation.Delete:
      return deleteItemAsync({
        id,
      });

    default:
      return () => undefined;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>,  { item, itemSyncInfo }: IRetryItemContainerProps): IRetryCallbackProps => ({
  retryAction: () =>
    dispatch(
      getRetryAction(item, itemSyncInfo)),
});

const mergeProps = (_: undefined, { retryAction }: IRetryCallbackProps, { itemSyncInfo }: IRetryItemContainerProps): IRetryProps => ({
  retryAction,
  description: `${itemSyncInfo.operation} failed`,
});

const RetryItem: ComponentClass<IRetryItemContainerProps> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps,
)(RetryComponent);

RetryItem.propTypes = propTypes;

export { RetryItem };
