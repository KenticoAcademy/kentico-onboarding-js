import * as React from 'react';
import * as classnames from 'classnames';
import * as PropTypes from 'prop-types';

interface IProps {
  readonly onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  readonly value: string;
  readonly isValid: boolean;
  readonly title: string | undefined;
}

interface IState {
  readonly isFocused: boolean;
}

export class Input extends React.PureComponent<IProps, IState> {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    title: PropTypes.string,
  };

  constructor(props: IProps) {
    super(props);

    this.state = ({
      isFocused: false,
    });
  }

  render(): JSX.Element {
    return (
      <div
        className={classnames(
          'input-group',
          this.state.isFocused && {
            'has-success': this.props.isValid,
            'has-error': !this.props.isValid,
          })
        }
      >
        <input
          className="form-control"
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this._focusGained}
          onBlur={this._focusLost}
          title={this.props.title}
        />
      </div>
    );
  }

  private _focusGained = (): void => {
    this.setState({
      isFocused: true,
    });
  };

  private _focusLost = (): void => {
    this.setState({
      isFocused: false,
    });
  };
}
