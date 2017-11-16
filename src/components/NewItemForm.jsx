import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { textIsEmpty, NEW_ITEM_TEXT_PLACEHOLDER } from '../utils/validation';

class NewItemForm extends PureComponent {
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
    const { newItemText } = this.state;
    const enableAddButton = !textIsEmpty(newItemText);

    return (
      <div className="form-inline">
        <input
          className="form-control col-md-5"
          type="text"
          placeholder={NEW_ITEM_TEXT_PLACEHOLDER}
          value={newItemText}
          onChange={this.onInputChange}
        />

        <button
          className="btn btn-primary"
          onClick={this.onAdd}
          disabled={!enableAddButton}
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

export { NewItemForm };
