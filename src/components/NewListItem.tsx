import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import classNames from 'classnames';
import { isStringNonempty } from '../utils/isStringNonempty';
import { HotKeys } from 'react-hotkeys';

export type NewListItemDispatchProps = {
  readonly addItem: (text: string) => void,
};

type NewListItemProps = NewListItemDispatchProps;

type NewListItemState = {
  readonly inputText: string,
  readonly focused: boolean,
};

export class NewListItem extends PureComponent<NewListItemProps, NewListItemState> {
  static displayName: string = 'NewListItem';

  static propTypes: ValidationMap<NewListItemProps> = {
    addItem: PropTypes.func.isRequired,
  };

  state: NewListItemState = {
    inputText: '',
    focused: false,
  };

  private _onFocus = (): void => {
    this.setState(() => ({ focused: true }));
  };

  private _onBlur = (): void => {
    this.setState(() => ({ focused: false }));
  };

  private _storeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.currentTarget.value;
    this.setState(() => ({ inputText: value }));
  };

  private _addNewItem = (): void => {
    const { inputText } = this.state;
    if (isStringNonempty(inputText)) {
      this.props.addItem(inputText);
      this.setState(() => ({ inputText: '' }));
    }
  };

  private _onKeyPress = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  render(): JSX.Element {
    const { inputText, focused } = this.state;
    const isValid: boolean = isStringNonempty(inputText);
    const title: string | undefined = isValid
      ? undefined
      : 'Please enter text';
    const className: string = classNames('input-group stretch', {
      'has-success': focused && isValid,
      'has-error': focused && !isValid,
    });

    return (
      <HotKeys handlers={{ 'confirm': this._addNewItem }}>
        <form className="flexbox" onKeyPress={this._onKeyPress}>
          <section className={className}>
            <div className="stretch">
              <input
                type="text"
                className="form-control"
                value={inputText}
                placeholder="New item"
                onChange={this._storeInputValue}
                autoFocus={true}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
              />
            </div>
            <div className="input-group-btn normal">
              <button
                type="button"
                className="btn btn-default"
                onClick={this._addNewItem}
                disabled={!isValid}
                title={title}
              >
                Add
              </button>
            </div>
          </section>
        </form>
      </HotKeys>
    );
  }
}
