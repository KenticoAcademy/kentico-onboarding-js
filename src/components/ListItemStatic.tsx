import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';
import { RetryItem } from '../containers/RetryItem';
import { ClipLoader } from 'react-spinners';
import { Revert } from '../containers/Revert';
import { IListItem } from '../models/interfaces/IListItem';

export interface IListItemStaticCallbackProps {
  readonly onItemOpened: () => void;
}

export interface IListItemStaticDataProps {
  readonly item: IListItem;
  readonly isClickable: boolean;
}

export interface IListItemStaticOwnProps {
  readonly itemNumber: number;
  readonly onTextSelection: (startOffset: number, endOffset: number) => void;
  readonly itemSyncInfo: IItemSyncInfo;
}

export const listItemStaticSharedPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  onTextSelection: PropTypes.func.isRequired,
  itemSyncInfo: PropTypes.shape({
    syncState: PropTypes.string.isRequired,
    operation: PropTypes.string.isRequired,
  }).isRequired,
};

export interface IListItemStaticProps extends IListItemStaticCallbackProps, IListItemStaticOwnProps, IListItemStaticDataProps {
}

export class ListItemStatic extends React.PureComponent<IListItemStaticProps> {
  static displayName = 'ListItemStatic';

  static propTypes = {
    ...listItemStaticSharedPropTypes,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onItemOpened: PropTypes.func.isRequired,
    isClickable: PropTypes.bool.isRequired,
  };

  _onMouseUp = () => {
    const {
      onTextSelection,
      onItemOpened,
      item,
      isClickable,
    } = this.props;

    if (!isClickable) {
      return;
    }

    const selection = window
      .getSelection()
      .getRangeAt(0);

    const { startOffset, endOffset } = selection;
    const correctedEndOffset = endOffset > 0 || startOffset === 0
      ? endOffset
      : item.text.length;

    onTextSelection(startOffset, correctedEndOffset);
    onItemOpened();
  };

  render() {
    const {
      itemNumber,
      item,
      itemSyncInfo,
    } = this.props;

    let syncingComponent;

    switch (itemSyncInfo.syncState) {
      case SyncState.Pending:
        syncingComponent = <ClipLoader color="#17a2b8" />;
        break;

      case SyncState.Desynced:
        syncingComponent = (
          <div className="form-inline">
            <div className="mr-2">
              <RetryItem
                item={item}
                itemSyncInfo={itemSyncInfo}
              />
            </div>
            <Revert
              syncOperation={itemSyncInfo.operation}
              id={item.id}
            />
          </div>
        );
        break;

      default:
        syncingComponent = undefined;
        break;
    }

    return (
      <div className="form-inline" >
        <span className="mr-2">
          {itemNumber + '.'}
        </span>
        <div onMouseUp={this._onMouseUp}>
          {item.text}
        </div>
        <div className="ml-3">
          {syncingComponent}
        </div>
      </div>
    );
  }
}
