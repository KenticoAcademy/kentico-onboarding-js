import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class Input extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = ({
      isFocused: false,
    });
  }

  focus = () => {
    this.setState({
      isFocused: true,
    });
  };

  blur = () => {
    this.setState({
      isFocused: false,
    });
  };

  render() {
    return (
      <div
        className={classnames('input-group',
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
          onFocus={this.focus}
          onBlur={this.blur}
          title={this.props.title}
        />
      </div>
    );
  }
}
