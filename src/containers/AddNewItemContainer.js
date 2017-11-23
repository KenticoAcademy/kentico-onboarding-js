import { addItem } from '../utils/actionCreators';
import { generateId } from '../utils/generateId';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { AddNewItem } from '../components/AddNewItem';

class AddNewItemContainer extends PureComponent {

  render() {
    return <AddNewItem onAdd={this.props.onAdd} />;
  }
}

function mapDispatchToProps(dispatch) {
  return { onAdd: (value) => dispatch(addItem(value, generateId())) };
}

export default connect(null, mapDispatchToProps)(AddNewItemContainer);
