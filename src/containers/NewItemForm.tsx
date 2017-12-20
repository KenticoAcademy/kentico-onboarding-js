import { connect } from 'react-redux';
import { NewItemForm as NewItemFormComponent } from '../components/NewItemForm';
import { addNewItem } from '../actions';
import { Dispatch } from 'redux';
import { IAction } from '../interfaces/IAction';

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  onSubmit: (text: string) => {
    dispatch(addNewItem(
      text,
    ));
  },
});

export const NewItemForm = connect(
  null,
  mapDispatchToProps,
)(NewItemFormComponent);
