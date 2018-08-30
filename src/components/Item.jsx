import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditableItem } from './EditableItem';
import { StaticItem } from './StaticItem';
import { validateInput } from '../utils/inputValidator';

export class Item extends PureComponent {
  static displayName = 'Item';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isInEditMode: false,
    };
  }

  _clickLabel = () => this.setState(() => ({
    isInEditMode: true,
  }));

  _cancelEdit = () => this.setState(() => ({
    isInEditMode: false,
  }));

  _saveItem = (value) => {
    if (!validateInput(value)) {
      return;
    }
    this.props.onEdit(this.props.item.id, value);
    this.setState(() => ({ isInEditMode: false }));
  };

  _deleteItem = () => this.props.onDelete(this.props.item.id);

  render() {
    const value = this.props.item.value;

    if (this.state.isInEditMode) {
      return (
        <EditableItem
          value={value}
          index={this.props.index}
          onEdit={this._saveItem}
          onDelete={this._deleteItem}
          onCancel={this._cancelEdit}
        />);
    }
    return (
      <StaticItem
        onClick={this._clickLabel}
        index={this.props.index}
        value={value}
        autoFocus
      />
    );
  }
}
