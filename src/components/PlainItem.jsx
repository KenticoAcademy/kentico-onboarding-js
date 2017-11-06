import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class PlainItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.index + '. ' + this.props.item.text}
      </div>
    );
  }
}
