import { connect } from 'react-redux';
import { createItem } from '../actions/actionCreators';
import { AddItem as AddItemComponent } from '../components/AddItem';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: (text: string) => dispatch(createItem(text)),
});

export const AddItem = connect(
  null,
  mapDispatchToProps,
)(AddItemComponent);
