import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { isInputValid } from '../../../utils/isInputValid';

export interface IEditedItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IEditedItemStateProps {
  readonly text: string;
}

export interface IEditedItemDispatchProps {
  readonly saveChanges: (text: string) => void;
  readonly cancelEditing: () => void;
  readonly deleteItem: () => void;
}

export type EditedItemProps = IEditedItemStateProps & IEditedItemDispatchProps & IEditedItemOwnProps;

interface IEditedItemState {
  readonly text: string;
}

export class EditedItem extends React.PureComponent<EditedItemProps, IEditedItemState> {
  static displayName = 'EditedItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    saveChanges: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  state = {
    text: this.props.text,
  };

  _editText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {value} = event.target;
    this.setState(() => ({text: value}));
  };

  _saveChanges = (): void => this.props.saveChanges(this.state.text);

  render(): JSX.Element {
    const {text} = this.state;
    const isValid: boolean = isInputValid(text);
    const inputClass: string = classNames('form-control', {
      'is-invalid': !isInputValid(text),
    });

    return (
      <div className="input-group col-sm-8">
        <div className="input-group-prepend">
          <span className="input-group-text">{this.props.index}.</span>
        </div>
        <input
          className={inputClass}
          type="text"
          value={text}
          onChange={this._editText}
        />
        <div
          className="input-group-append"
          id="button-addon4"
        >
          <button
            className="btn btn-primary"
            type="button"
            onClick={this._saveChanges}
            disabled={!isValid}
            title={!isValid ? 'Insert text.' : undefined}
          >
            Save
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.props.cancelEditing}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.props.deleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
