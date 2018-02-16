import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyActions } from '../constants/keys';
import { isTextEmpty } from '../utils/validation';
import {
  IListItemFormOwnProps,
  listItemFormPropTypes
} from './ListItemForm';

export interface ISyncedListItemFormCallbackProps {
  readonly onSave: (text: string, uri: string) => void;
  readonly onCancel: () => void;
  readonly onDelete: (uri: string) => void;
}

export interface ISyncedListItemFormDataProps {
}

export interface ISyncedListItemFormProps extends ISyncedListItemFormCallbackProps, ISyncedListItemFormDataProps, IListItemFormOwnProps {
}

interface ISyncedListItemFormState {
  text: string;
}

export const syncedListItemFormPropTypes = {
  ...listItemFormPropTypes,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export class SyncedListItemForm extends React.PureComponent<ISyncedListItemFormProps, ISyncedListItemFormState> {
  static displayName = 'SyncedListItemForm';

  static propTypes = syncedListItemFormPropTypes;

  private input: HTMLInputElement;

  constructor(props: ISyncedListItemFormProps) {
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

  _onInputChange = (e: React.FormEvent<HTMLInputElement>): void => this.setState({
    text: e.currentTarget.value,
  });

  _submitNewItemText = (): void => {
    const { onSave } = this.props;
    const { text } = this.state;

    onSave(text, '/api/v1/listItems/');
  };

  _onDelete = (): void => {
    this.props.onDelete('/api/v1/listItems/');
  };

  _textChanged = (newText: string): boolean =>
    this.props.item.text !== newText;

  _onEnterPress = (): void => {
    const { text } = this.state;

    if (!isTextEmpty(text)) {
      this._onSaveWithNewText(text);
    }
  };

  _onSave = (): void =>
    this._onSaveWithNewText(this.state.text);

  _onSaveWithNewText = (newText: string): void => {
    if (this._textChanged(newText)) {
      this._submitNewItemText();
    } else {
      this.props.onCancel();
    }
  };

  _setInputRef = (ref: HTMLInputElement): void => {
    this.input = ref;
  };

  render() {
    const { text } = this.state;
    const enableSaveButton = !isTextEmpty(text);

    const {
      onCancel,
      children,
    } = this.props;

    const handlers = {
      [keyActions.OnEnter]: this._onEnterPress,
      [keyActions.OnEsc]: onCancel,
    };

    return (
      <div>
        <HotKeys
          {...{className: 'row'}}
          handlers={handlers}
        >
          <label className="col-form-label pl-3">
            {`${this.props.itemNumber}. `}
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
              onClick={this._onSave}
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
              onClick={this._onDelete}
              title="Removes item from list"
            >
              Delete
            </button>
          </div>
        </HotKeys>
        {children}
      </div>
    );
  }
}
