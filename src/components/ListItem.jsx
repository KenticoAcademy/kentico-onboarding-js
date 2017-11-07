import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalText: props.item.text,
      text: props.item.text,
      isBeingEdited: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
  }

  handleInputChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSaveButton() {
    const text = this.state.text;
    this.setState({ isBeingEdited: false, text, originalText: text });
  }

  handleCancelButton() {
    const text = this.state.originalText;
    this.setState({ isBeingEdited: false, text });
  }

  handleItemClick() {
    this.setState({ isBeingEdited: true });
  }

  render() {
    const inEditMode = this.state.isBeingEdited;
    const blueStyle = { background: 'blue', color: 'white' };
    const redStyle = { background: 'red', color: 'white' };

    let listItemContent;
    if (inEditMode) {
      listItemContent = (
        <div className="ListItem">
          <input type="text" value={this.state.text} onChange={this.handleInputChange} />
          <button style={blueStyle} onClick={this.handleSaveButton}>Save</button>
          <button onClick={this.handleCancelButton}>Cancel</button>
          <button style={redStyle} onClick={this.props.deleteClick}>Delete</button>
        </div>
      );
    }
    else {
      listItemContent = (
        <div className="ListItem" onClick={this.handleItemClick}>
          <h2>{this.state.text}</h2>
        </div>
      );
    }

    return listItemContent;
  }
}

ListItem.propTypes = {
  item: PropTypes.object,
  deleteClick: PropTypes.func.isRequired,
};
