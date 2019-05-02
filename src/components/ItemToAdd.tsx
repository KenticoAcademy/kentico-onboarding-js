import * as React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { isValidText } from '../utils/validateText';


export type ItemToAddDispatchProps = {
  readonly postItem: (text: string) => void;
};

type ItemToAddProps = ItemToAddDispatchProps;

type ItemToAddState = {
  readonly text: string,
  readonly enableInputColors: boolean
};

export class ItemToAdd extends React.PureComponent<ItemToAddProps, ItemToAddState> {
  static displayName = 'ItemToAdd';

  static propTypes = {
    postItem: PropTypes.func.isRequired
  };

  state: ItemToAddState = {
    text: '',
    enableInputColors: false
  };

  _changedTextInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    this.setState(() => ({
      text: event.target.value,
      enableInputColors: true
    }));
  };

  _addNewItem = (): void => {
    const text = this.state.text;
    this.props.postItem(text);
    this.setState(() => ({
      text: '',
      enableInputColors: false
    }));
  };

  render(): JSX.Element {
    const validText: boolean = isValidText(this.state.text);
    const classes = classNames({
      'input-group': true,
      'has-error': !validText && this.state.enableInputColors,
      'has-success': validText && this.state.enableInputColors
    });
    return (
      <div className="list-group-item">
        <li
          className={classes}
        >
          <input
            type="text"
            className="form-control"
            name="itemToAddTextBox"
            value={this.state.text}
            onChange={this._changedTextInput}
          />

          <div className="input-group-append input-group-btn">
            <button
              className="btn btn-light"
              type="button"
              name="itemToAddSubmitButton"
              value="Add"
              onClick={this._addNewItem}
              disabled={!validText}
            >
              Add
            </button>
          </div>
        </li>
      </div>
    );
  }
}
