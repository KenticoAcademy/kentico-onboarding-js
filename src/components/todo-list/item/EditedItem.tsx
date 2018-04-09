import * as React from 'react';
import * as PropTypes from 'prop-types';
import { validateText } from '../../../utils/validateText';
import { Input } from '../Input';
import { IndexedItem } from '../../../models/IndexedItem';

export interface IEditedItemCallbackProps {
  readonly onUpdateItem: (text: string) => void;
  readonly onEditStop: () => void;
  readonly onDeleteItem: () => void;
}

export interface IEditedItemDataProps {
  readonly item: IndexedItem;
}

interface IState {
  readonly editedText: string;
  readonly isInputValid: boolean;
}

export class EditedItem extends React.PureComponent<IEditedItemCallbackProps & IEditedItemDataProps, IState> {
  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditStop: PropTypes.func.isRequired,
  };

  constructor(props: IEditedItemCallbackProps & IEditedItemDataProps) {
    super(props);

    this.state = {
      editedText: props.item.text,
      isInputValid: true,
    };
  }

  render(): JSX.Element {
    const invalidTextTitle = (this.state.isInputValid)
      ? undefined
      : 'Empty item cannot be stored.\nTip: Use delete button to remove an item';

    return (
      <div className="row">
        <div className="col-xs-4">
          <div className="input-group">
            <span className="input-group-addon">
              {this.props.item.index}.
            </span>
            <Input
              value={this.state.editedText}
              isValid={this.state.isInputValid}
              onChange={this._changeItemText}
              title={invalidTextTitle}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this._saveItem}
          title={invalidTextTitle}
          disabled={!this.state.isInputValid}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.props.onEditStop}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this._deleteItem}
        >
          Delete
        </button>
      </div>
    );
  }

  private _changeItemText = ({currentTarget: {value}}: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      editedText: value,
      isInputValid: validateText(value),
    });
  };

  private _saveItem = (): void => {
    this.props.onUpdateItem(
      this.state.editedText,
    );
  };

  private _deleteItem = (): void => {
    this.props.onDeleteItem();
  }
}
