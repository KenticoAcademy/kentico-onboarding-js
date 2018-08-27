import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class StaticItem extends PureComponent {
  static displayName = 'NewItem';

  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.index}. {this.props.value}
      </div>
    );
  }
}

StaticItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  value: PropTypes.string.isRequired
};
