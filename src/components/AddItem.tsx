import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isTextEmpty } from '../utils/isTextEmpty';

export interface IAddItemDispatchProps {
  readonly onAddItem: (text: string) => void;
}

export type IAddItemProps = IAddItemDispatchProps;

interface IAddItemState {
  readonly text: string;
}

export class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItemInput';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  _addNewItem = (): void => {
    this.props.onAddItem(this.state.text);
    this.setState(() => ({text: ''}));
  };

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
    const text = event.currentTarget.value;
    this.setState(() => ({text}));
  };

  render(): JSX.Element {
    const isTextValid = isTextEmpty(this.state.text);
    const title = isTextValid ? undefined : 'You can\'t save an empty input :(';

    return (
      <li className="list-group-item">
        <div className="input-group col-md-8">
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            onChange={this._storeInputValue}
            placeholder="You have to write something :)"
          />
          <div className="input-group-append">
            <button
              className="btn btn-info"
              type="submit"
              onClick={this._addNewItem}
              disabled={!isTextValid}
              data-toggle="tooltip"
              data-placement="top"
              title={title}
            >
              Add
            </button>
          </div>
        </div>
      </li>
    );
  }
}
