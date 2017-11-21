import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { textIsEmpty } from '../utils/validation';
import '../css/WideInput.css';

const keyMap = {
  'submitInput': 'enter',
};

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

  onEnterPress = () => {
    const { newItemText } = this.state;

    if (!textIsEmpty(newItemText)) {
      this.onAdd();
    }
  };

  render() {
    const { newItemText } = this.state;
    const enableAddButton = !textIsEmpty(newItemText);

    const handlers = {
      'submitInput': this.onEnterPress,
    };

    return (
      <div className="form-inline">
        <HotKeys
          handlers={handlers}
          keyMap={keyMap}
        >
          <input
            className="form-control WideInput"
            type="text"
            placeholder="Item name cannot be empty"
            value={newItemText}
            onChange={this.onInputChange}
            autoFocus={true}
          />
        </HotKeys>

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
