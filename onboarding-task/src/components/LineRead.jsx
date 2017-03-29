import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class LineRead extends PureComponent {
  static displayName = 'LineRead';

  static propTypes = {
    line: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
  };

  _handleDoubleClick = () => {
    this.props.onDoubleClick(this.props.line.id);
  };

  render() {
    return (
      <div onDoubleClick={this._handleDoubleClick} >
        <span>{this.props.index}. </span>
        {this.props.line.text}
      </div>
    );
  }
}

export { LineRead };
