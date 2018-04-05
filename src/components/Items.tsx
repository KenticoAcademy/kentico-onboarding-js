import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { ListItem } from '../containers/ListItem';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';

export interface IItemsDataProps {
  readonly itemsSyncInfo: IItemSyncInfo[];
}

const propTypes = {
  itemsSyncInfo: PropTypes.arrayOf(PropTypes.shape({
    syncState: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

const Items: React.SFC<IItemsDataProps> = ({ itemsSyncInfo }) =>
  <div>
    {itemsSyncInfo.map((itemSyncInfo, index) => {
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
  </div>;

Items.displayName = 'Items';
Items.propTypes = propTypes;

export { Items };
