import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ClosedListItem extends PureComponent {
  static displayName = 'ClosedListItem';

  static propTypes = {
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  onItemClick = () => {
    const selection = window
      .getSelection()
      .getRangeAt(0);

    const { startOffset, endOffset } = selection;
    const { onItemClick } = this.props;

    onItemClick(startOffset, endOffset);
  };

  render() {
    const { number, text } = this.props;

    return (
      <div onMouseUp={this.onItemClick}>
        {number + '. '}
        {text}
      </div>
    );
  }
}
