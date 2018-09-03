import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import { validateInput } from '../utils/inputValidator';

export class NewItem extends PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    onAdd: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }

  _changeInput = (event) => {
    event.persist();
    this.setState(() => ({ inputText: event.target.value }));
  };

  _addItem = () => {
    this.props.onAdd(this.state.inputText);
    this.setState(() => ({ inputText: '' }));
  };

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.inputText}
            onChange={this._changeInput}
            autoFocus
          />
          <button
            type="button"
            disabled={!validateInput(this.state.inputText)}
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
