import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { textIsEmpty } from '../utils/validation';
import '../css/WideInput.css';

const keyMap = {
  'submitInput': 'enter',
  'cancelChanges': 'esc',
};

class ListItemEditMode extends PureComponent {
  constructor(props) {
    super(props);

    const { text } = this.props;

    this.state = {
      text,
    };
  }

  componentDidMount() {
    const { startOffset, endOffset } = this.props;
    this.input.setSelectionRange(startOffset, endOffset);
  }

  onInputChange = (e) => this.setState({ text: e.target.value });

  onSave = () => {
    const { text } = this.state;
    this.props.onSave(text);
  };

  onEnterPress = () => {
    const { text } = this.state;

    if (!textIsEmpty(text)) {
      this.onSave();
    }
  };

  setInputRef = (input) => {
    this.input = input;
  };

  render() {
    const { text } = this.state;
    const { number, onCancel } = this.props;
    const enableSaveButton = !textIsEmpty(text);

    const handlers = {
      'submitInput': this.onEnterPress,
      'cancelChanges': onCancel,
    };

    return (
      <div className="form-inline">
        <label className="col-form-label">
          {`${number}. `}
        </label>

        <HotKeys
          keyMap={keyMap}
          handlers={handlers}
        >
          <input
            className="form-control WideInput"
            type="text"
            value={text}
            placeholder="Item name cannot be empty"
            onChange={this.onInputChange}
            autoFocus={true}
            ref={this.setInputRef}
          />
        </HotKeys>

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
  startOffset: PropTypes.number.isRequired,
  endOffset: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { ListItemEditMode };
