import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { enableUniqueIds } from 'react-html-id';

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

    enableUniqueIds(this);
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
        onClick={this._toggleEditMode}
        text={this.props.text}
      />);

    return (
      <li className="list-group-item">
        <span>{this.props.number}. </span>
        {this.state.inEditMode ? itemEditor : itemDisplay}
      </li>);
  }
}
