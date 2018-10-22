import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import { isTextValid } from '../utils/isTextValid';
import { createValidationTools } from '../utils/validationTools';

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
    const validationTools = createValidationTools(this.state.text, this.state.isFocused);

    return (
      <div className="form-inline">
        <div className={validationTools.className}>
          <input
            className="form-control"
            value={this.state.text}
            onChange={this._changeInput}
            title={validationTools.tooltip}
            onBlur={this._toggleFocus}
            onFocus={this._toggleFocus}
            autoFocus
          />
          <button
            type="button"
            disabled={!isTextValid(this.state.text)}
            title={validationTools.tooltip}
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
