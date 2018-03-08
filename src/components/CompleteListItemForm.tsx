import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyActions } from '../constants/keys';
import { isTextEmpty } from '../utils/validation';
import {
  IListItemFormOwnProps,
  listItemFormPropTypes
} from './ListItemForm';

export interface ICompleteListItemFormCallbackProps {
  readonly onSave: (text: string) => void;
  readonly onCancel: () => void;
  readonly onDelete: () => void;
}

interface ICompleteListItemFormProps extends ICompleteListItemFormCallbackProps, IListItemFormOwnProps {
}

interface ICompleteListItemFormState {
  text: string;
}

export class CompleteListItemForm extends React.PureComponent<ICompleteListItemFormProps, ICompleteListItemFormState> {
  static displayName = 'CompleteListItemForm';

  static propTypes = {
    ...listItemFormPropTypes,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  private input: HTMLInputElement;

  constructor(props: ICompleteListItemFormProps) {
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

    onSave(text);
  };

  _textChanged = (newText: string): boolean =>
    this.props.item.text !== newText;

  _onEnterPress = (): void => {
    const { text } = this.state;

    if (!isTextEmpty(text)) {
      this._onSave();
    }
  };

  _onSave = (): void => {
    if (this._textChanged(this.state.text)) {
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
      onDelete,
    } = this.props;

    const handlers = {
      [keyActions.OnEnter]: this._onEnterPress,
      [keyActions.OnEsc]: onCancel,
    };

    return (
      <div>
        <HotKeys handlers={handlers}>
          <div className="row">
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
                onClick={onDelete}
                title="Removes item from list"
              >
                Delete
              </button>
            </div>
          </div>
        </HotKeys>
      </div>
    );
  }
}
