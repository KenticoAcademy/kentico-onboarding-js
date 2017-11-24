import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { textIsEmpty } from '../utils/validation';

const keyMap = {
  'submitInput': 'enter',
};

export class NewItemForm extends PureComponent {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

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
      <HotKeys
        handlers={handlers}
        keyMap={keyMap}
        className="row"
      >
        <div className="input-group col">
          <input
            className="form-control col-md-6"
            type="text"
            placeholder="Item name cannot be empty"
            value={newItemText}
            onChange={this.onInputChange}
            autoFocus={true}
          />
          <button
            className="btn btn-primary"
            onClick={this.onAdd}
            disabled={!enableAddButton}
          >
            Add
          </button>
        </div>
      </HotKeys>
    );
  }
}
