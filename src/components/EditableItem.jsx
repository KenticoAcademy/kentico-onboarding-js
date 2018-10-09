import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isTextValid } from '../utils/isTextValid';

export class EditableItem extends PureComponent {
  static displayName = 'EditableItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,

    onCancelEdit: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.item.text,
      isFocused: true
    };
  }

  _changeInput = (event) => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ text: eventTargetValue }));
  };

  _saveInput = () => this.props.onUpdateItem(this.state.text);

  _onFocus = () => {
    this.setState(() => ({ isFocused: true }));
  };

  _onBlur = () => {
    this.setState(() => ({ isFocused: false }));
  };

  render() {
    const isInputFieldValid = isTextValid(this.state.text);
    const tooltip = !isInputFieldValid ? 'You have to insert some text!' : '';
    const formGroupClassName = classNames('form-group', this.props.className, {
      'has-success': isInputFieldValid && this.state.isFocused,
      'has-error': !isInputFieldValid && this.state.isFocused
    });

    return (
      <div className="form-inline">
        <div className={formGroupClassName}>
          {this.props.index}.
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            title={tooltip}
            onChange={this._changeInput}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            autoFocus
          />
          <button
            type="button"
            disabled={!isInputFieldValid}
            title={tooltip}
            className="btn btn-primary"
            onClick={this._saveInput}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.onCancelEdit}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.onDeleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
