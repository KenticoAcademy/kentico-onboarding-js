import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { validateInput } from '../utils/isTextValid';

export class NewItem extends PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    onAdd: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isFocused: true
    };
  }

  _changeInput = (event) => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ text: eventTargetValue }));
  };

  _addItem = () => {
    this.props.onAdd(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _onFocus = () => {
    this.setState(() => ({ isFocused: true }));
  };

  _onBlur = () => {
    this.setState(() => ({ isFocused: false }));
  };

  render() {
    const isInputFieldValid = validateInput(this.state.text);
    const tooltip = !isInputFieldValid ? 'You have to insert some text!' : '';
    const formGroupClassName = classNames('form-group', this.props.className, {
      'has-success': isInputFieldValid && this.state.isFocused,
      'has-error': !isInputFieldValid && this.state.isFocused
    });

    return (
      <div className="form-inline">
        <div className={formGroupClassName}>
          <input
            className="form-control"
            value={this.state.text}
            onChange={this._changeInput}
            title={tooltip}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            autoFocus
          />
          <button
            type="button"
            disabled={!isInputFieldValid}
            title={tooltip}
            className="btn btn-default"
            onClick={this._addItem}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
