import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AddItem extends PureComponent {
  static displayName = 'AddItem';

  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  _updateValue = (event) => this.setState({ value: event.target.value });

  _addItem = () => {
    this.props.onChange(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="text"
            value={this.state.value}
            onChange={this._updateValue}
          />
          <button
            type="button"
            className="btn btn-default"
            onClick={this._addItem}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}
