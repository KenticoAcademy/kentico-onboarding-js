import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditableItem } from './EditableItem';
import { StaticItem } from './StaticItem';

export class Item extends PureComponent {
  static displayName = 'Item';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }),
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      inEdit: false,
    };
  }

  _clickLabel = () => this.setState(() => ({
    inEdit: true,
  }));

  _cancelEdit = () => this.setState(() => ({
    inEdit: false,
  }));

  _saveItem = (value) => {
    this.props.onEdit(this.props.item.id, value);
    this.setState(() => ({ inEdit: false }));
  };

  _deleteItem = () => this.props.onDelete(this.props.item.id);

  render() {
    const value = this.props.item.value;

    if (this.state.inEdit) {
      return (
        <EditableItem
          value={value}
          index={this.props.index}
          onEdit={this._saveItem}
          onDelete={this._deleteItem}
          onCancel={this._cancelEdit}
          autoFocus
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
