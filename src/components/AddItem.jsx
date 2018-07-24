import React from 'react';
import PropTypes from 'prop-types';

export class AddItem extends React.PureComponent {
  static displayName = 'AddItemInput';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  _addNewItem = () => {
    this.props.onAddItem(this.state.text);
    this.setState({ text: '' });
  };

  _storeInputValue = event => {
    const text = event.target.value;
    this.setState({ text });
  };

  render() {
    return (
      <li className="list-group-item">
        <div className="input-group col-md-8">
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            onChange={this._storeInputValue}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="submit"
              onClick={this._addNewItem}
            >
              Add
            </button>
          </span>
        </div>
      </li>
    );
  }
}
