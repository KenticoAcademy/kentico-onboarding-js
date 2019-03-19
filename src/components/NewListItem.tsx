import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import { isStringNonempty } from '../utils/isStringNonempty';
import { HotKeys } from 'react-hotkeys';

export type NewListItemDispatchProps = {
  readonly addItem: (text: string) => void,
};

type NewListItemProps = NewListItemDispatchProps;

type NewListItemState = {
  readonly inputText: string,
  readonly isInputChanged: boolean,
};

export class NewListItem extends PureComponent<NewListItemProps, NewListItemState> {
  static displayName: string = 'NewListItem';

  static propTypes: ValidationMap<NewListItemProps> = {
    addItem: PropTypes.func.isRequired,
  };

  state: NewListItemState = {
    inputText: '',
    isInputChanged: false,
  };

  private _storeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.currentTarget.value;
    this.setState(() => ({
      inputText: value,
      isInputChanged: true,
    }));
  };

  private _addNewItem = (): void => {
    const { inputText } = this.state;
    if (isStringNonempty(inputText)) {
      this.props.addItem(inputText);
      this.setState(() => ({ inputText: '' }));
    }
  };

  render(): JSX.Element {
    const { inputText, isInputChanged } = this.state;
    const isValid = isStringNonempty(inputText);
    const inputClassName = isValid ? 'has-success' : 'has-error';

    return (
      <HotKeys handlers={{ confirm: this._addNewItem }}>
        <div className="flexbox">
          <div className={`input-group stretch ${isInputChanged ? inputClassName : ''}`}>
            <div className="stretch">
              <input
                type="text"
                className="form-control"
                value={inputText}
                placeholder="New item"
                onChange={this._storeInputValue}
                autoFocus={true}
              />
            </div>
            <div className="input-group-btn normal">
              <button
                type="button"
                className="btn btn-default"
                onClick={this._addNewItem}
                disabled={!isValid}
                title={isValid ? undefined : 'Please enter text'}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </HotKeys>
    );
  }
}
