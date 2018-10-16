import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NewItem } from '../containers/NewItem';
import { Item } from '../containers/Item';

const ListGroupItem = (props) => (
  <li className="list-group-item">
    {props.children}
  </li>);
ListGroupItem.DisplayName = 'ListGroupItem';

export class List extends PureComponent {
  static displayName = 'List';

  static propTypes = {
    itemsIds: PropTypes.object.isRequired,
  };

  _renderListItems = () =>
    this.props
      .itemsIds
      .map((id, index) => (
        <ListGroupItem key={id}>
          <Item
            id={id}
            index={index + 1}
          />
        </ListGroupItem>)
      );

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
                <ul className="list-group">
                  {this._renderListItems()}
                  <ListGroupItem>
                    <NewItem />
                  </ListGroupItem>
                </ul>
            </pre>
      </div>
    );
  }
}
