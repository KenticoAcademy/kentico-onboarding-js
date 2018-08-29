import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';

export class NewItem extends PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  _changeInput = e => this.setState({ value: e.target.value });

  _addItem = () => {
    this.props.onAdd(this.state.value);
    this.setState(() => ({ value: '' }));
  };

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            value={this.state.value}
            onChange={this._changeInput}
            autoFocus
          />
          <button
            type="button"
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
