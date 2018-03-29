import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListItemDisplay extends PureComponent {
  static displayName = 'ListItemDisplay';

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    return <span onClick={this.props.onClick}>{this.props.text}</span>;
  }
}
