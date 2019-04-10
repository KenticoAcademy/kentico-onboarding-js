import * as React from 'react';
import { ChangeEvent } from 'react';
import * as classNames from 'classnames';
import *as PropTypes from 'prop-types';
import { isInputValid } from '../../../utils/isInputValid';

export interface INewItemDispatchProps {
  readonly addItem: (text: string) => void;
}

interface INewItemState {
  readonly text: string;
  readonly isFocused: boolean;
}

export class NewItem extends React.PureComponent<INewItemDispatchProps, INewItemState> {
  static displayName = 'NewItem';

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    text: '',
    isFocused: false,
  };

  _changeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    this.setState(() => ({text: event.target.value}));
  };

  _addItem = (): void => {
    this.props.addItem(this.state.text);
    this.setState(() => ({text: ''}));
  };

  _changeFocus = (): void => this.setState(prevState => ({isFocused: !prevState.isFocused}));

  render(): JSX.Element {
    const {text, isFocused} = this.state;
    const isValid: boolean = isInputValid(text);
    const inputClass: string = classNames('form-control', {
      'is-invalid': isFocused && !isValid,
    });

    return (
      <li className="list-group-item">
        <div className="input-group col-sm-5">
          <input
            type="text"
            className={inputClass}
            value={text}
            onChange={this._changeInput}
            onFocus={this._changeFocus}
            onBlur={this._changeFocus}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              id="button-addon2"
              onClick={this._addItem}
              disabled={!isValid}
              title={!isValid ? 'Insert text.' : undefined}
            >
              Add
            </button>
          </div>
        </div>
      </li>
    );
  }
}
