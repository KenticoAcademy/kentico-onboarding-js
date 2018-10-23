import * as React from 'react';
import { isTextValid } from '../utils/isTextValid';
import { createValidationTools } from '../utils/validationTools';
import { IAction } from '../actions/IAction';
import * as PropTypes from 'prop-types';

export interface INewItemDispatchProps {
  readonly onAddClick: (text: string) => IAction;
}

interface INewItemState {
  readonly text: string;
  readonly isFocused: boolean;
}

export class NewItem extends React.PureComponent<INewItemDispatchProps, INewItemState> {
  static displayName = 'NewItem';

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
  };

  constructor(props: INewItemDispatchProps) {
    super(props);

    this.state = {
      text: '',
      isFocused: false,
    };
  }

  _changeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({text: eventTargetValue}));
  };

  _addItem = (): void => {
    this.props.onAddClick(this.state.text);
    this.setState(() => ({text: ''}));
  };

  _toggleFocus = (): void => {
    this.setState((prevState) => ({isFocused: !prevState.isFocused}));
  };

  render(): JSX.Element {
    const validationTools = createValidationTools(this.state.text, this.state.isFocused);

    return (
      <div className="form-inline">
        <div className={validationTools.className}>
          <input
            className="form-control"
            value={this.state.text}
            onChange={this._changeInput}
            title={validationTools.tooltip}
            onBlur={this._toggleFocus}
            onFocus={this._toggleFocus}
            autoFocus={true}
          />
          <button
            type="button"
            disabled={!isTextValid(this.state.text)}
            title={validationTools.tooltip}
            className="btn btn-default"
            onClick={this._addItem}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
