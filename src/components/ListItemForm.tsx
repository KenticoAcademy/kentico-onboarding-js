import * as React from 'react';
import { FormEvent, PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyActions } from '../constants/keys';
import { isTextEmpty } from '../utils/validation';
import { IListItem } from '../models/IListItem';
import { IAction } from '../interfaces/IAction';

interface IListItemFormCallbackProps {
  onSave: (text: string) => IAction;
  onCancel: () => IAction;
  onDelete: () => IAction;
}

interface IListItemFormDataProps {
  itemNumber: number;
  item: IListItem;
  selectionRangeStarts: number;
  selectionRangeEnds: number;
}

export interface IListItemFormProps extends IListItemFormCallbackProps, IListItemFormDataProps { }

interface IOpenedListItemState {
  text: string;
}

export class ListItemForm extends PureComponent<IListItemFormProps, IOpenedListItemState> {
  static displayName = 'ListItemForm';

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    itemNumber: PropTypes.number.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    selectionRangeStarts: PropTypes.number.isRequired,
    selectionRangeEnds: PropTypes.number.isRequired,
  };

  private input: HTMLInputElement;

  constructor(props: IListItemFormProps) {
    super(props);

    this.state = {
      text: this.props.item.text,
    };
  }

  componentDidMount() {
    const {
      selectionRangeStarts,
      selectionRangeEnds,
    } = this.props;

    this.input.setSelectionRange(selectionRangeStarts, selectionRangeEnds);
  }

  _onInputChange = (e: FormEvent<HTMLInputElement>) => this.setState({
    text: e.currentTarget.value,
  });

  _submitNewItemText = () => {
    const { onSave } = this.props;
    const { text } = this.state;

    onSave(text);
  };

  _onEnterPress = () => {
    const { text } = this.state;

    if (!isTextEmpty(text)) {
      this._submitNewItemText();
    }
  };

  _setInputRef = (ref: HTMLInputElement) => {
    this.input = ref;
  };

  render() {
    const { text } = this.state;
    const { itemNumber, onCancel, onDelete } = this.props;
    const enableSaveButton = !isTextEmpty(text);

    const handlers = {
      [keyActions.OnEnter]: this._onEnterPress,
      [keyActions.OnEsc]: onCancel,
    };

    return (
      <HotKeys
        {...{className: 'row'}}
        handlers={handlers}
      >
        <label className="col-form-label pl-3">
          {`${itemNumber}. `}
        </label>
        <div className="input-group col">
          <input
            className="form-control col-md-6 rounded"
            type="text"
            value={text}
            placeholder="Item name cannot be empty"
            onChange={this._onInputChange}
            autoFocus={true}
            ref={this._setInputRef}
          />

          <button
            className="btn btn-primary ml-3"
            onClick={this._submitNewItemText}
            disabled={!enableSaveButton}
            title="Saves new text which cannot be empty"
          >
            Save
          </button>

          <button
            className="btn btn-secondary ml-2"
            onClick={onCancel}
            title="Drops unsaved changes"
          >
            Cancel
          </button>

          <button
            className="btn btn-danger ml-2"
            onClick={onDelete}
            title="Removes item from list"
          >
            Delete
          </button>
        </div>
      </HotKeys>
    );
  }
}
