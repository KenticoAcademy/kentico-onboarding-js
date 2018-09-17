import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NewItem } from './NewItem';
import { Item } from '../containers/Item';

export class List extends PureComponent {
  static displayName = 'List';

  static propTypes = {
    itemsIds: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired
  };

  _renderListItems = () =>
    this.props
      .itemsIds
      .map((id, index) => (
        <li
          className="list-group-item"
          key={id}
        >
          <Item
            id={id}
            index={index + 1}
          />
        </li>)
      );

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center" />
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
                <ul className="list-group">
                  {this._renderListItems()}
                  <li className="list-group-item">
                    <NewItem onAdd={this.props.onAdd} />
                  </li>
                </ul>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
