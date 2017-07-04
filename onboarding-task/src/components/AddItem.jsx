import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../actions/actionCreators';

class AddItem extends PureComponent {

  static displayName = 'AddItem';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentText: '',
    };
  }

  _handleChange = event => {
    this.setState({ currentText: event.target.value });
  };

  _addItem = event => {
    event.preventDefault();
    this.props.onAddItem(this.state.currentText);
    this.setState({ currentText: '' });
  };

  render() {
    return (
      <form onSubmit={this._addItem} className="form-inline list-group-item">
        <input
          type="text"
          className="form-control"
          onChange={this._handleChange}
          value={this.state.currentText}
        />
        <button
          type="submit"
          className="form-control btn btn-default"
        >
          Add
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (text) => {
      dispatch(ActionCreators.createItem(text));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddItem);
