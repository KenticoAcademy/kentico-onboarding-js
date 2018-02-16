import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IListItem } from '../models/interfaces/IListItem';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';

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
      item: { text },
      itemSyncInfo,
    } = this.props;

    const isSyncing = itemSyncInfo.state === SyncState.Pending;
    const onMouseUp = isSyncing ? () => undefined : this._onTextSelection;

    return (
      <div onMouseUp={onMouseUp}>
        {itemNumber + '. '}
        {text}
        {isSyncing && ' - is syncing'}
        {itemSyncInfo.state === SyncState.Unsynced && ' - failed to sync'}
      </div>
    );
  }
}
