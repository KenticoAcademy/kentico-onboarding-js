import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListItemDisplay extends PureComponent {
  static displayName = 'ListItemDisplay';

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    return <span>{this.props.text}</span>;
  }
}
