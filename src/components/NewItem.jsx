import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import { isTextValid } from '../utils/isTextValid';
import {
  createClassNamesFormValidation,
  createTooltip
} from '../utils/validationTools';

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
    const isInputTextValid = isTextValid(this.state.text);
    const tooltip = createTooltip(isInputTextValid);
    const formGroupClassName = createClassNamesFormValidation(isInputTextValid, this.state.isFocused);

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
            disabled={!isInputTextValid}
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
