import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toggleEditing } from '../utils/actionCreators';

export class ListItem extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  };

  render() {
    const { store } = this.context;
    const { id, text, isBeingEdited } = this.props;
    return (
      <div
        className="form-control-static"
        onClick={() => store.dispatch(toggleEditing(id, isBeingEdited))
        }
      >
        {text}
      </div>
    );
  }
}

ListItem.contextTypes = {
  store: React.PropTypes.object,
};
