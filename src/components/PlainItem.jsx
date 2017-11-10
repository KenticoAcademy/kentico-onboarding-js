import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export class PlainItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.index + '. ' + this.props.item.text}
      </div>
    );
  }
}
