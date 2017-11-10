import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { validateText } from '../utils/textValidation';
import { Input } from './Input';

export class EditedItem extends PureComponent {
  static propTypes = {
    onSaveItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editedText: props.item.text,
      isInputValid: true,
    };
  }

  changeOfInput = (event) => {
    this.setState({
      editedText: event.currentTarget.value,
      isInputValid: validateText(event.currentTarget.value),
    });
  };

  saveItem = () => {
    this.props.onSaveItem(this.state.editedText);
  };

  render() {
    const invalidTextTitle = (this.state.isInputValid)
      ? undefined
      : 'Empty item cannot be stored. \n' +
        'Tip: Use delete button to remove an item';

    return (
      <div className="row">
        <div className="col-xs-4">
          <div className="input-group">
            <span className="input-group-addon">
              {this.props.index}.
            </span>
            <Input
              value={this.state.editedText}
              isValid={this.state.isInputValid}
              onChange={this.changeOfInput}
              title={invalidTextTitle}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.saveItem}
          title={invalidTextTitle}
          disabled={!this.state.isInputValid}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}
