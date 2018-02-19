// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplay } from './ListItemDisplay';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
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
    const { item, bullet } = this.props;

    let listItem = (
      <ListItemDisplay
        itemValue={item.value}
        onEdit={this.toggleEditMode}
      />
    );

    if (this.state.isEditing) {
      listItem = (
        <ListItemEditor
          itemValue={item.value}
          onCancel={this.toggleEditMode}
          onDelete={this.deleteItem}
          onUpdate={this.updateItem}
        />
      );
    }

    return (
      <span className="input-group">
        <span className="input-group-addon">
          {bullet}
        </span>
        {listItem}
      </span>
    );
  }
}
