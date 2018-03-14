// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplay } from './ListItemDisplay';
import { Item } from '../models/item';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.instanceOf(Item).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  _toggleEditMode = () => this.setState(prevState => ({ isEditing: !prevState.isEditing }));

  _deleteItem = () => {
    const { onDelete, item } = this.props;
    onDelete(item);
  };

  _updateItem = (updatedItemValue) => {
    const { item, onSave } = this.props;
    onSave(item, updatedItemValue);
    this._toggleEditMode();
  };

  render() {
    const { item: { todo: { value }, bullet } } = this.props;

    let listItem = (
      <ListItemDisplay
        itemValue={value}
        bullet={bullet}
        onEdit={this._toggleEditMode}
      />
    );

    if (this.state.isEditing) {
      listItem = (
        <ListItemEditor
          itemValue={value}
          bullet={bullet}
          onCancel={this._toggleEditMode}
          onDelete={this._deleteItem}
          onUpdate={this._updateItem}
        />
      );
    }

    return (
      <div>
        {listItem}
      </div>
    );
  }
}
