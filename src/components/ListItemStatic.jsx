import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListItemStatic extends PureComponent {
  static displayName = 'ListItemStatic';

  static propTypes = {
    number: PropTypes.number.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
    onTextSelection: PropTypes.func.isRequired,
  };

  onTextSelection = () => {
    const selection = window
      .getSelection()
      .getRangeAt(0);

    const { startOffset, endOffset } = selection;
    const { onTextSelection } = this.props;

    onTextSelection(startOffset, endOffset);
  };

  render() {
    const {
      number,
      item: { text },
    } = this.props;

    return (
      <div onMouseUp={this.onTextSelection}>
        {number + '. '}
        {text}
      </div>
    );
  }
}
