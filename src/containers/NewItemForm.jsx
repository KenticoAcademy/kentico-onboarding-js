import { connect } from 'react-redux';
import { NewItemForm as NewItemFormComponent } from '../components/NewItemForm';
import { addNewItem } from '../actions';

const mapDispatchToProps = dispatch => ({
  onSubmit: text => {
    dispatch(addNewItem(
      text,
    ));
  },
});

export const NewItemForm = connect(
  null,
  mapDispatchToProps,
)(NewItemFormComponent);
