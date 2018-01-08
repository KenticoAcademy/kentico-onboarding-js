import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';
import { Guid } from '../models/Guid';
import { FetchItemsState } from '../models/FetchItemsState';

export interface IItemsDataProps {
  readonly itemIds: Guid[];
  readonly fetchItemsState: FetchItemsState;
}

export interface IItemsCallbackProps {
  readonly fetchItems: (uri: string) => void;
}

interface IIItemsProps extends IItemsDataProps, IItemsCallbackProps {}

export class Items extends React.PureComponent<IIItemsProps> {
  static displayName = 'Items';

  static propTypes = {
    itemIds: PropTypes.arrayOf(PropTypes.string),
    fetchItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.fetchItemsState === FetchItemsState.INITIAL) {
      this.props.fetchItems('/api/v1/listItems');
    }
  }

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
