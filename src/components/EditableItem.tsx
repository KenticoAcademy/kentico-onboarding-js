import * as React from 'react';
import { isTextValid } from '../utils/isTextValid';
import { createValidationTools } from '../utils/validationTools';
import { IAction } from '../actions/IAction';
import { ListItem } from '../models/ListItem';
import * as PropTypes from 'prop-types';

export interface IEditableItemStateProps {
  readonly item: ListItem;
  readonly index: number;
}

export interface IEditableItemDispatchProps {
  readonly onCancelClick: () => IAction;
  readonly onDeleteClick: () => IAction;
  readonly onSaveClick: (text: string) => IAction;
}

interface IEditableItemState {
  readonly text: string;
  readonly isFocused: boolean;
}

type EditableItemProps = IEditableItemDispatchProps & IEditableItemStateProps;

export class EditableItem extends React.PureComponent<EditableItemProps, IEditableItemState> {
  static displayName = 'EditableItem';

  static propTypes = {
    item: PropTypes.instanceOf(ListItem),
    index: PropTypes.number.isRequired,

    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
  };

  constructor(props: EditableItemProps) {
    super(props);
    this.state = {
      text: this.props.item.text,
      isFocused: false,
    };
  }

  _changeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({text: eventTargetValue}));
  };

  _saveInput = (): IAction => this.props.onSaveClick(this.state.text);

  _toggleFocus = (): void => {
    this.setState((prevState) => ({isFocused: !prevState.isFocused}));
  };

  render(): JSX.Element {
    const validationTools = createValidationTools(this.state.text, this.state.isFocused);

    return (
      <div className="form-inline">
        <div className={validationTools.className}>
          {this.props.index}.
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            title={validationTools.tooltip}
            onChange={this._changeInput}
            onBlur={this._toggleFocus}
            onFocus={this._toggleFocus}
            autoFocus={true}
          />
          <div
            className="btn-group"
            role="group"
            aria-label="Item buttons"
          >
            <button
              type="button"
              disabled={!isTextValid(this.state.text)}
              title={validationTools.tooltip}
              className="btn btn-primary"
              onClick={this._saveInput}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={this.props.onCancelClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.onDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
