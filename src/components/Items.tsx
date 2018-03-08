import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { ListItem } from '../containers/ListItem';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';

export interface IItemsDataProps {
  readonly itemsSyncInfo: IItemSyncInfo[];
}

export class Items extends React.PureComponent<IItemsDataProps> {
  static displayName = 'Items';

  static propTypes = {
    itemsSyncInfo: PropTypes.arrayOf(PropTypes.shape({
      syncState: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    return (
      <div>
        {this.props.itemsSyncInfo.map((itemSyncInfo, index) => {
          const className = classNames(
            'list-group-item',
            { disabled: itemSyncInfo.syncState === SyncState.Pending }
          );

          return (
            <li
              className={className}
              key={itemSyncInfo.id}
            >
              <ListItem
                itemId={itemSyncInfo.id}
                itemNumber={index + 1}
                itemSyncInfo={itemSyncInfo}
              />
            </li>
          );
        })}
      </div>
    );
  }
}
