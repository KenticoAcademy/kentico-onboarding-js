import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isValidText } from '../utils/isValidText';

export interface IAddItemDispatchProps {
  onAddItem: (text: string) => void;
}

export type IAddItemProps = IAddItemDispatchProps;

interface IAddItemState {
  text: string;
}

export class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItemInput';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  _addNewItem = () => {
    this.props.onAddItem(this.state.text);
    this.setState(() => ({text: ''}));
  };

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    this.setState(() => ({text}));
  };

  render(): JSX.Element {
    const textIsValid = isValidText(this.state.text);

    return (
      <li className="list-group-item">
        <div className="input-group col-md-8">
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            onChange={this._storeInputValue}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="submit"
              onClick={this._addNewItem}
              disabled={!textIsValid}
            >
              Add
            </button>
          </span>
        </div>
      </li>
    );
  }
}
