import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItem, IListItem } from '../models/ListItem';
import { isValidText } from '../utils/isValidText';

interface IActiveItemProps {
  index: number;
  item: IListItem;
  onSaveItem: (text: string) => void;
  onCancelItem: () => void;
  onDeleteItem: () => void;
}

interface IActiveItemState {
  text: string;
}

export class ActiveItem extends React.PureComponent<IActiveItemProps, IActiveItemState> {
  static displayName = 'ActiveItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.instanceOf(ListItem).isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onCancelItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.item.text
  };

  _saveInputValue = () => this.props.onSaveItem(this.state.text);

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    this.setState(() => ({text}));
  };

  render(): JSX.Element {
    const textIsValid = isValidText(this.state.text);

    return (
      <div className="input-group col-md-8">
        <span className="input-group-addon">
          {this.props.index + 1}.
        </span>
        <input
          className="form-control"
          type="text"
          value={this.state.text}
          onChange={this._storeInputValue}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={this._saveInputValue}
            disabled={!textIsValid}
          >
            Save
          </button>
          <button
            className="btn btn-default"
            type="submit"
            onClick={this.props.onCancelItem}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="submit"
            onClick={this.props.onDeleteItem}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}
