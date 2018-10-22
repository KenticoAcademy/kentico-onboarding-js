import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isTextValid } from '../utils/isTextValid';
import { createValidationTools } from '../utils/validationTools';

export class EditableItem extends PureComponent {
  static displayName = 'EditableItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,

    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.item.text,
      isFocused: false
    };
  }

  _changeInput = (event) => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ text: eventTargetValue }));
  };

  _saveInput = () => this.props.onSaveClick(this.state.text);

  _toggleFocus = () => {
    this.setState((prevState) => ({ isFocused: !prevState.isFocused }));
  };

  render() {
    const validationTools = createValidationTools(this.state.text, this.state.isFocused);

    return (
      <div className="form-inline">
        <div className={validationTools.className}>
          {this.props.index}.
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            title={validationTools.tooltip}
            onChange={this._changeInput}
            onBlur={this._toggleFocus}
            onFocus={this._toggleFocus}
            autoFocus
          />
          <div
            className="btn-group"
            role="group"
            aria-label="Item buttons"
          >
            <button
              type="button"
              disabled={!isTextValid(this.state.text)}
              title={validationTools.tooltip}
              className="btn btn-primary"
              onClick={this._saveInput}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={this.props.onCancelClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.onDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
