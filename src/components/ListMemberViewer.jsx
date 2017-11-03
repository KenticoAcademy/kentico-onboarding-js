import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListMemberViewer extends PureComponent {

  static propTypes = {
    note: PropTypes.shape({
      text: PropTypes.string.isRequired,
      isEditActive: PropTypes.bool.isRequired,
    }),
    number: PropTypes.number.isRequired,
    startNoteEditor: PropTypes.func.isRequired,
  };

  onTextClick = () => {
    this.props.startNoteEditor(this.props.note);
  };

  render() {
    return (
      <p onClick={this.onTextClick}>{this.props.number + '. ' + this.props.note.text}</p>
    );
  }
}