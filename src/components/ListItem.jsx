import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ListItemDisplay } from './ListItemDisplay';
import { ListItemEditor } from './ListItemEditor';

export class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inEditMode: false,
    };
  }

  _toggleEditMode = () => {
    this.setState(prevState => ({
      inEditMode: !prevState.inEditMode,
    }));
  };

  _changeItem = (itemId, newText) => {
    this._toggleEditMode();
    this.props.onChange(itemId, newText);
  };

  _itemClick = (e) => {
    e.preventDefault();
    if (!this.state.inEditMode) {
      this._toggleEditMode();
    }
  };

  render() {
    const itemEditor = (
      <ListItemEditor
        id={this.props.id}
        text={this.props.text}
        onDelete={this.props.onDelete}
        onChange={this._changeItem}
        onCancel={this._toggleEditMode}
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
        {this.state.inEditMode ? itemEditor : itemDisplay}
      </li>);
  }
}
