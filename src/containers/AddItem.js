import { connect } from 'react-redux';
import { createItem } from '../actions/actionCreators';
import { AddItem as AddItemComponent } from '../components/AddItem';

const mapDispatchToProps = (dispatch) => ({
  onChange: (text) => dispatch(createItem(text)),
});

export const AddItem = connect(
  null,
  mapDispatchToProps
)(AddItemComponent);
