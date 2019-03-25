import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isTextEmpty } from '../utils/isTextEmpty';
import { SyncLoader } from 'react-spinners';
import { color } from '../constants/color';
import { ItemStatus } from '../reducers/interfaces/ItemStatus';
import { NewItemProperties } from '../models/NewItemProperties';
import { createErrorPopup } from '../utils/popups';

export interface IAddItemStateProps {
  readonly properties: NewItemProperties;
}

export interface IAddItemDispatchProps {
  readonly onAddItem: (text: string) => void;
  readonly onNewItemErrorPopupWasRendered: () => void;
}

export type IAddItemProps = IAddItemStateProps & IAddItemDispatchProps;

interface IAddItemState {
  readonly text: string;
}

export class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItemInput';

  static propTypes = {
    properties: PropTypes.instanceOf(NewItemProperties).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onNewItemErrorPopupWasRendered: PropTypes.func.isRequired
  };

  state = {
    text: this.props.properties.text,
  };

  componentDidUpdate(prevProps: Readonly<IAddItemProps>): void {
    const shouldResetTextInput = prevProps.properties.status === ItemStatus.BeingProcessed
      && this.props.properties.status === ItemStatus.NothingIsHappening;
    if (shouldResetTextInput) {
      this.setState(() => ({
        text: ''
      }));
    }
  }

  _addNewItem = (): void => {
    this.props.onAddItem(this.state.text);
  };

  _storeInputValue = (event: React.FormEvent<HTMLInputElement>): void => {
    const text = event.currentTarget.value;
    this.setState(() => ({ text }));
  };

  render(): JSX.Element {
    const isTextValid = isTextEmpty(this.state.text);
    const emptyInputErrorMessage = isTextValid ? undefined : 'You can\'t save an empty input :(';

    const { status, error } = this.props.properties;
    const isProcessingRequest = status === ItemStatus.BeingProcessed;
    const addingFailed = status === ItemStatus.SavingFailed;

    if (addingFailed && !error.wasRendered) {
      createErrorPopup(error.errorMessage);
      this.props.onNewItemErrorPopupWasRendered();
    }

    return (
      <li className="list-group-item d-flex">
        <div className="input-group col-md-8">
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            onChange={this._storeInputValue}
            disabled={isProcessingRequest}
            placeholder="You have to write something :)"
          />
          <div className="input-group-append">
            <button
              className="btn btn-info"
              type="submit"
              onClick={this._addNewItem}
              disabled={!isTextValid || isProcessingRequest}
              data-toggle="tooltip"
              data-placement="top"
              title={emptyInputErrorMessage}
            >
              Add
            </button>
          </div>
        </div>
        {isProcessingRequest && (
          <div className="pt-2">
            <SyncLoader
              color={color}
              size={10}
            />
          </div>
        )}
        {addingFailed && (
          <span className="py-1 pt-2 font-weight-bold text-danger">
            Adding failed, please try it again.
          </span>
        )}
      </li>
    );
  }
}
