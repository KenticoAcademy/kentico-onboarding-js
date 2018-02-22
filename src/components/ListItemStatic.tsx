import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IListItem } from '../models/interfaces/IListItem';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';
import { RetryItem } from '../containers/RetryItem';
import { SyncOperation } from '../models/enums/SyncOperation';
import { ClipLoader } from 'react-spinners';

export interface IListItemStaticCallbackProps {
  readonly onItemOpened: () => void;
}

export interface IListItemStaticOwnProps {
  readonly item: IListItem;
  readonly itemNumber: number;
  readonly onTextSelection: (startOffset: number, endOffset: number) => void;
  readonly itemSyncInfo: IItemSyncInfo;
}

export interface IListItemStaticProps extends IListItemStaticCallbackProps, IListItemStaticOwnProps {
}

export const listItemStaticPropTypes = {
  onTextSelection: PropTypes.func.isRequired,
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  itemSyncInfo: PropTypes.shape({
    state: PropTypes.string.isRequired,
  }),
};

export const listItemStaticDefaultProps = {
  itemSyncInfo: undefined,
};

export class ListItemStatic extends React.PureComponent<IListItemStaticProps> {
  static displayName = 'ListItemStatic';

  static propTypes = {
    ...listItemStaticPropTypes,
    onItemOpened: PropTypes.func.isRequired,
  };

  static defaultProps = listItemStaticDefaultProps;

  _onTextSelection = (): void => {
    const selection = window
      .getSelection()
      .getRangeAt(0);

    const { startOffset, endOffset } = selection;
    const {onTextSelection, onItemOpened } = this.props;

    onTextSelection(startOffset, endOffset);
    onItemOpened();
  };

  render() {
    const {
      itemNumber,
      item,
      item: { text },
      itemSyncInfo,
    } = this.props;

    let syncingComponent;
    let onMouseUp = this._onTextSelection;

    switch (itemSyncInfo.state) {
      case SyncState.Pending:
        onMouseUp = () => undefined;
        syncingComponent = <ClipLoader color="#17a2b8" />;
        break;

      case SyncState.Unsynced:
        if (itemSyncInfo.operation === SyncOperation.Delete) {
          onMouseUp = () => undefined;
        }
        syncingComponent = <RetryItem item={item} itemSyncInfo={itemSyncInfo} />;
        break;

      default:
        syncingComponent = undefined;
        break;
    }

    return (
      <div className="form-inline">
        <div onMouseUp={onMouseUp}>
          {itemNumber + '. '}
          {text}
        </div>
        <div className="ml-5">
          {syncingComponent}
        </div>
      </div>
    );
  }
}
