import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { textIsEmpty } from '../utils/validation';

const keyMap = {
  'submitInput': 'enter',
  'cancelChanges': 'esc',
};

export class ListItemEditMode extends PureComponent {
  static propTypes = {
    number: PropTypes.number.isRequired,
    selectionRangeStarts: PropTypes.number.isRequired,
    selectionRangeEnds: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { text } = this.props;

    this.state = {
      text,
    };
  }

  componentDidMount() {
    const { selectionRangeStarts, selectionRangeEnds } = this.props;
    this.input.setSelectionRange(selectionRangeStarts, selectionRangeEnds);
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
      <HotKeys
        keyMap={keyMap}
        handlers={handlers}
        className="row"
      >
        <label className="col-form-label pl-3">
          {`${number}. `}
        </label>
        <div className="input-group col">
          <input
            className="form-control col-md-6"
            type="text"
            value={text}
            placeholder="Item name cannot be empty"
            onChange={this.onInputChange}
            autoFocus={true}
            ref={this.setInputRef}
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
      </HotKeys>
    );
  }
}
