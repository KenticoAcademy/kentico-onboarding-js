import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validateText } from '../../utils/validateText';
import { Input } from './Input';

export class AddedItem extends PureComponent {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      inputText: '',
      isInputValid: false,
    });
  }

  changeItemText = ({ currentTarget: { value } }) => {
    this.setState({
      inputText: value,
      isInputValid: validateText(value),
    });
  };

  addItem = () => {
    this.props.onAddItem(this.state.inputText);
    this.setState({
      inputText: '',
      isInputValid: false,
    });
  };

  render() {
    const invalidTextTitle = (this.state.isInputValid)
      ? undefined
      : 'New item must consist of non-empty text';

    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <Input
            value={this.state.inputText}
            isValid={this.state.isInputValid}
            onChange={this.changeItemText}
            title={invalidTextTitle}
          />
        </div>
        <button
          type="button"
          title={invalidTextTitle}
          className="btn btn-primary"
          disabled={!this.state.isInputValid}
          onClick={this.addItem}
        >
          Add
        </button>
      </li>
    );
  }
}
