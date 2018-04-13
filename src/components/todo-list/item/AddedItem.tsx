import * as React from 'react';
import * as PropTypes from 'prop-types';
import { validateText } from '../../../utils/validateText';
import { Input } from '../Input';

interface IState {
  readonly inputText: string;
  readonly isInputValid: boolean;
}

export interface IAddedItemCallbackProps {
  readonly onAddItem: (text: string) => void;
}

export class AddedItem extends React.PureComponent<IAddedItemCallbackProps, IState> {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props: IAddedItemCallbackProps) {
    super(props);

    this.state = ({
      inputText: '',
      isInputValid: false,
    });
  }

  render(): JSX.Element {
    const invalidTextTitle = (this.state.isInputValid)
      ? undefined
      : 'New item must consist of non-empty text';

    return (
      <span>
        <div className="col-xs-4">
          <Input
            value={this.state.inputText}
            isValid={this.state.isInputValid}
            onChange={this._changeItemText}
            title={invalidTextTitle}
          />
        </div>
        <button
          type="button"
          title={invalidTextTitle}
          className="btn btn-primary"
          disabled={!this.state.isInputValid}
          onClick={this._addItem}
        >
          Add
        </button>
      </span>
    );
  }

  private _changeItemText = ({currentTarget: {value}}: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      inputText: value,
      isInputValid: validateText(value),
    });
  };

  private _addItem = (): void => {
    this.props.onAddItem(this.state.inputText);

    this.setState({
      inputText: '',
      isInputValid: false,
    });
  };
}
