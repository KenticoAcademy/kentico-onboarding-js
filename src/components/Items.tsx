import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';
import { Guid } from '../models/Guid';

export interface IItemsDataProps {
  readonly itemIds: Guid[];
}

export class Items extends React.PureComponent<IItemsDataProps> {
  static displayName = 'Items';

  static propTypes = {
    itemIds: PropTypes.arrayOf(PropTypes.string),
  };

  render() {
    return (
      <div>
        {this.props.itemIds.map((itemId, index) => (
          <li
            className="list-group-item"
            key={itemId}
          >
            <ListItem
              itemId={itemId}
              itemNumber={index + 1}
            />
          </li>))}
      </div>
    );
  }
}
