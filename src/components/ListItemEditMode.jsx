import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { textIsEmpty } from '../utils/validation';

class ListItemEditMode extends PureComponent {
  constructor(props) {
    super(props);

    const { text } = this.props;

    this.state = {
      text,
    };
  }

  putFocusAtTheEndOfText = (e) => {
    const { text } = this.state;
    const length = text.length;

    e.target.setSelectionRange(length, length);
  };

  onInputChange = (e) => this.setState({ text: e.target.value });

  onSave = () => {
    const { text } = this.state;
    this.props.onSave(text);
  };

  onKeyPress = (target) => {
    if (target.charCode === 13) {
      const { text } = this.state;

      if (!textIsEmpty(text)) {
        this.onSave();
      }
    }
  };

  render() {
    const { text } = this.state;
    const { number } = this.props;
    const enableSaveButton = !textIsEmpty(text);

    return (
      <div className="form-inline">
        <label className="col-form-label">
          {number}{'. '}
        </label>

        <input
          className="form-control col-md-5"
          type="text"
          value={text}
          placeholder="Item name cannot be empty"
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
          autoFocus={true}
          onFocus={this.putFocusAtTheEndOfText}
        />

        <button
          className="btn btn-primary"
          onClick={this.onSave}
          disabled={!enableSaveButton}
        >
          Save
        </button>

        <button
          className="btn btn-secondary"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>

        <button
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

ListItemEditMode.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { ListItemEditMode };
