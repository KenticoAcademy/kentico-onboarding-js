import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyActions } from '../constants/keys';
import { isTextEmpty } from '../utils/validation';

export class NewItemForm extends PureComponent {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  static displayName = 'NewItemForm';

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

  onEscPress = () => {
    this.setState({
      newItemText: '',
    });
  };

  render() {
    const { newItemText } = this.state;
    const enableAddButton = !isTextEmpty(newItemText);

    const handlers = {
      [keyActions.OnEnter]: this.onEnterPress,
      [keyActions.OnEsc]: this.onEscPress,
    };

    return (
      <HotKeys
        handlers={handlers}
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
            title="Adds new item to list. Text cannot be empty"
          >
            Add
          </button>
        </div>
      </HotKeys>
    );
  }
}
