import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditor } from './ListItemEditor';

export class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    inEditMode: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  _changeItem = (itemId, newText) => {
    this.props.onToggle(itemId);
    this.props.onChange(itemId, newText);
  };

  _itemClick = (e) => {
    e.preventDefault();
    this.props.onToggle(this.props.id, true);
  };

  render() {
    const itemEditor = (
      <ListItemEditor
        id={this.props.id}
        text={this.props.text}
        onDelete={this.props.onDelete}
        onChange={this._changeItem}
        onCancel={this.props.onToggle}
      />);
    const itemDisplay = (
      <ListItemDisplay
        text={this.props.text}
      />);

    return (
      <li
        className="list-group-item"
        onClick={this._itemClick}
      >
        <span>{this.props.number}. </span>
        {this.props.inEditMode ? itemEditor : itemDisplay}
      </li>);
  }
}
