import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IListItem } from '../models/interfaces/IListItem';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';
import { RetryItem } from '../containers/RetryItem';
import { ClipLoader } from 'react-spinners';
import { Revert } from '../containers/Revert';

export interface IListItemStaticCallbackProps {
  readonly onItemOpened: () => void;
}

export interface IListItemStaticDataProps {
  readonly isClickable: boolean;
}

export interface IListItemStaticOwnProps {
  readonly item: IListItem;
  readonly itemNumber: number;
  readonly onTextSelection: (startOffset: number, endOffset: number) => void;
  readonly itemSyncInfo: IItemSyncInfo;
}

export interface IListItemStaticProps extends IListItemStaticCallbackProps, IListItemStaticOwnProps, IListItemStaticDataProps {
}

export const listItemStaticPropTypes = {
  onTextSelection: PropTypes.func.isRequired,
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  itemSyncInfo: PropTypes.shape({
    syncState: PropTypes.string.isRequired,
    operation: PropTypes.string.isRequired,
  }).isRequired,
};

export class ListItemStatic extends React.PureComponent<IListItemStaticProps> {
  static displayName = 'ListItemStatic';

  static propTypes = {
    ...listItemStaticPropTypes,
    onItemOpened: PropTypes.func.isRequired,
    isClickable: PropTypes.bool.isRequired,
  };

  _onMouseUp = (): void => {
    const { onTextSelection, onItemOpened, item, isClickable } = this.props;

    if (!isClickable) {
      return undefined;
    }

    const selection = window
      .getSelection()
      .getRangeAt(0);

    const { startOffset, endOffset } = selection;


    const correctedEndOffset = endOffset > 0 || startOffset === 0 ? endOffset : item.text.length;

    onTextSelection(startOffset, correctedEndOffset);
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

    switch (itemSyncInfo.syncState) {
      case SyncState.Pending:
        syncingComponent = <ClipLoader color="#17a2b8" />;
        break;

      case SyncState.Desynced:
        syncingComponent = (
          <div className="form-inline">
            <div className="mr-2">
              <RetryItem item={item} itemSyncInfo={itemSyncInfo} />
            </div>
            <Revert syncOperation={itemSyncInfo.operation} id={item.id} />
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
          {text}
        </div>
        <div className="ml-3">
          {syncingComponent}
        </div>
      </div>
    );
  }
}
