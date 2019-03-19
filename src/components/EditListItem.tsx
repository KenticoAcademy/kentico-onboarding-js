import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import { isStringNonempty } from '../utils/isStringNonempty';
import { HotKeys } from 'react-hotkeys';
import { HotkeyHandler } from './Hotkeys/appKeyMap';

export type EditListItemContainerProps = {
  readonly id: Guid,
};

export type EditListItemDispatchProps = {
  readonly save: (text: string) => void,
  readonly delete: () => void,
  readonly cancel: () => void,
};

export type EditListItemStateProps = {
  readonly text: string,
};

type EditListItemProps = EditListItemDispatchProps & EditListItemStateProps & EditListItemContainerProps;

type EditListItemState = {
  readonly inputText: string,
  readonly isInputChanged: boolean,
};

export class EditListItem extends PureComponent<EditListItemProps, EditListItemState> {
  static displayName: string = 'EditListItem';

  static propTypes: ValidationMap<EditListItemProps> = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    save: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  state: EditListItemState = {
    inputText: this.props.text,
    isInputChanged: false,
  };

  private _storeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    this.setState(() => ({
      inputText: value,
      isInputChanged: true,
    }));
  };

  private _saveNewItemText = () => {
    const { inputText } = this.state;
    if (isStringNonempty(inputText)) {
      this.props.save(inputText);
    }
  };

  render(): JSX.Element {
    const { isInputChanged } = this.state;
    const isValid = isStringNonempty(this.state.inputText);
    const inputClassName = isValid ? 'has-success' : 'has-error';
    const handlers: HotkeyHandler = {
      cancelEditing: this.props.cancel,
      deleteItem: this.props.delete,
      confirm: this._saveNewItemText,
    };

    return (
      <HotKeys handlers={handlers}>
        <div className="flexbox">
          <div className={`input-group stretch ${isInputChanged ? inputClassName : ''}`}>
            <div className="stretch">
              <input
                type="text"
                className="form-control"
                value={this.state.inputText}
                onChange={this._storeInputValue}
                tabIndex={0}
                autoFocus={true}
              />
            </div>
            <div className="input-group-btn normal">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this._saveNewItemText}
                disabled={!isValid}
                title={isValid ? undefined : 'Please enter text'}
                tabIndex={-1}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.cancel}
                tabIndex={-1}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.props.delete}
                tabIndex={-1}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </HotKeys>
    );
  }
}
