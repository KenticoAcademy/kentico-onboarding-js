// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplay } from './ListItemDisplay';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.object.isRequired,
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
    const { item } = this.props;

    let listItem = (
      <ListItemDisplay
        item={item}
        onEdit={this._toggleEditMode}
      />
    );

    if (this.state.isEditing) {
      listItem = (
        <ListItemEditor
          item={item}
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
