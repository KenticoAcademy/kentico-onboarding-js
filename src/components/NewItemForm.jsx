import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { isTextEmpty } from '../utils/validation';

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

  onInputChange = e => this.setState({
    newItemText: e.target.value,
  });

  onAdd = () => {
    const { onAdd } = this.props;
    const { newItemText } = this.state;

    onAdd(newItemText);

    this.setState({
      newItemText: '',
    });
  };

  onEnterPress = () => {
    const { newItemText } = this.state;

    if (!isTextEmpty(newItemText)) {
      this.onAdd();
    }
  };

  render() {
    const { newItemText } = this.state;
    const enableAddButton = !isTextEmpty(newItemText);

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
            className="form-control col-md-6 rounded"
            type="text"
            placeholder="Item name cannot be empty"
            value={newItemText}
            onChange={this.onInputChange}
            autoFocus={true}
          />
          <button
            className="btn btn-primary ml-3"
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
