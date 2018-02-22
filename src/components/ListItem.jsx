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

  toggleEditMode = () => this.setState(prevState => ({ isEditing: !prevState.isEditing }));

  deleteItem = () => {
    const { onDelete, item } = this.props;
    onDelete(item);
  };

  updateItem = (updatedItemValue) => {
    const { item, onSave } = this.props;
    onSave(item, updatedItemValue);
    this.toggleEditMode();
  };

  render() {
    const { item } = this.props;

    let listItem = (
      <ListItemDisplay
        item={item}
        onEdit={this.toggleEditMode}
      />
    );

    if (this.state.isEditing) {
      listItem = (
        <ListItemEditor
          item={item}
          onCancel={this.toggleEditMode}
          onDelete={this.deleteItem}
          onUpdate={this.updateItem}
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
