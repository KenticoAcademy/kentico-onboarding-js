import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItem, IListItem } from '../models/ListItem';
import { isValidText } from '../utils/isValidText';
import { getTimeFromNow } from '../utils/getTimeFromNow';

interface IActiveItemProps {
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
    const title = textIsValid ? undefined : 'You can\'t save an empty input :(';

    return (
      <a className="list-group-item list-group-item-action">
        <div className="row">
          <strong className="col-sm-2 py-2"> {getTimeFromNow(this.props.item.creationTime)} </strong>
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
                onClick={this._saveInputValue}
                disabled={!textIsValid}
                title={title}
              >
                Save
              </button>
              <button
                className="btn btn-light border border-secondary"
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
            </div>
          </div>
        </div>
      </a>
    );
  }
}
