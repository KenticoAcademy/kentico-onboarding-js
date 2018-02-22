// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    item: PropTypes.shape({
      bullet: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemValue: props.item.value,
    };
  }

  handleInputChange = (event) => this.setState({ itemValue: event.target.value });

  handleInputKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.updateItem();
    }
    else if (event.key === 'Escape') {
      this.props.onCancel();
    }
  };

  updateItem = () => {
    const { itemValue } = this.state;

    if (itemValue) {
      this.props.onUpdate(itemValue);
    }
  };

  render() {
    const { onCancel, onDelete, item: { bullet } } = this.props;
    const { itemValue } = this.state;

    return (
      <div className="input-group">
        <span className="input-group-addon">
          {bullet}
        </span>
        <input
          type="text"
          className="form-control"
          value={itemValue}
          onChange={this.handleInputChange}
          onKeyUp={this.handleInputKeyUp}
          autoFocus
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.updateItem}
            disabled={!itemValue}
          > Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={onCancel}
          > Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
          > Delete
          </button>
        </span>
      </div>
    );
  }
}
