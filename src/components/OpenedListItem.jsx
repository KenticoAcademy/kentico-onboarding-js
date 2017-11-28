import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyActions } from '../constants/keys';
import { isTextEmpty } from '../utils/validation';

export class OpenedListItem extends PureComponent {
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
    const {
      selectionRangeStarts,
      selectionRangeEnds,
    } = this.props;

    this.input.setSelectionRange(selectionRangeStarts, selectionRangeEnds);
  }

  onInputChange = e => this.setState({
    text: e.target.value,
  });

  onSave = () => {
    const { onSave } = this.props;
    const { text } = this.state;

    onSave(text);
  };

  onEnterPress = () => {
    const { text } = this.state;

    if (!isTextEmpty(text)) {
      this.onSave();
    }
  };

  setInputRef = input => {
    this.input = input;
  };

  render() {
    const { text } = this.state;
    const { number, onCancel, onDelete } = this.props;
    const enableSaveButton = !isTextEmpty(text);

    const handlers = {
      [keyActions.OnEnter]: this.onEnterPress,
      [keyActions.OnEsc]: onCancel,
    };

    return (
      <HotKeys
        handlers={handlers}
        className="row"
      >
        <label className="col-form-label pl-3">
          {`${number}. `}
        </label>
        <div className="input-group col">
          <input
            className="form-control col-md-6 rounded"
            type="text"
            value={text}
            placeholder="Item name cannot be empty"
            onChange={this.onInputChange}
            autoFocus={true}
            ref={this.setInputRef}
          />

          <button
            className="btn btn-primary ml-3"
            onClick={this.onSave}
            disabled={!enableSaveButton}
            title="Saves new text which cannot be empty"
          >
            Save
          </button>

          <button
            className="btn btn-secondary ml-2"
            onClick={onCancel}
            title="Drops unsaved changes"
          >
            Cancel
          </button>

          <button
            className="btn btn-danger ml-2"
            onClick={onDelete}
            title="Removes item from list"
          >
            Delete
          </button>
        </div>
      </HotKeys>
    );
  }
}
