// components/NewItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

export class NewItem extends React.PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemValue: '',
    };
  }

  handleChange = (event) => this.setState({ itemValue: event.target.value });

  handleKeyUp = (event) => {
    if (event.key === 'Enter' && this.state.itemValue) {
      this.addItem();
    }
    else if (event.key === 'Escape') {
      this.setState({ itemValue: '' });
    }
  };

  addItem = () => {
    this.props.onCreate(this.state.itemValue);
    this.setState({ itemValue: '' });
  };

  render() {
    const { itemValue } = this.state;

    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="What is on your mind ... ?"
          value={itemValue}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-default"
            onClick={this.addItem}
            disabled={!itemValue}
          > Add
          </button>
        </span>
      </div>
    );
  }
}

