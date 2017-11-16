import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class NewItemForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newItemText: '',
    };
  }

  onInputChange = (e) => {
    this.setState({ newItemText: e.target.value });
  };

  onAdd = () => {
    const { newItemText } = this.state;
    this.props.onAdd(newItemText);
    this.setState({ newItemText: '' });
  };

  render() {
    return (
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Item name cannot be empty"
          value={this.state.newItemText}
          onChange={this.onInputChange}
        />

        <button
          className="btn btn-secondary"
          onClick={this.onAdd}
        >
          Add
        </button>
      </div>
    );
  }
}

NewItemForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
