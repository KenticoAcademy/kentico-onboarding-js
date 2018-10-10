import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isTextValid } from '../utils/isTextValid';

export class NewItem extends PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    onAddClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isFocused: false
    };
  }

  _changeInput = (event) => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ text: eventTargetValue }));
  };

  _addItem = () => {
    this.props.onAddClick(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _toggleFocus = () => {
    this.setState((prevState) => ({ isFocused: !prevState.isFocused }));
  };

  render() {
    const isInputFieldValid = isTextValid(this.state.text);
    const tooltip = !isInputFieldValid ? 'You have to insert some text' : '';
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
            onBlur={this._toggleFocus}
            onFocus={this._toggleFocus}
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
