import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddedItem } from '../../containers/todo-list/item/AddedItem';
import { Item } from '../../containers/todo-list/item/Item';
import { Uuid } from '../../utils/generateId';

export interface IListDataProps {
  readonly ids: Uuid[];
}

export class ItemsList extends React.PureComponent<IListDataProps> {
  static propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props: IListDataProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <ul className="list-group">
        {this.props.ids
          .map((id: Uuid, index: number) =>
            <li
              className="list-group-item"
              key={id}
            >
              <Item
                id={id}
                index={index + 1}
              />
            </li>,
          )
        }
        <li className="list-group-item">
          <AddedItem />
        </li>
      </ul>
    );
  }
}
