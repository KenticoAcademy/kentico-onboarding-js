import { addItem } from '../actions/listActions';
import {
  changeValue,
  cancelChange,
} from '../actions/newItemActions';
import { connect } from 'react-redux';

import { NewItem as NewItemComponent } from '../components/NewItem';
import { isInputValid } from '../utils/validationService';

const mapStateToProps = (state) => ({
  itemValue: state.newItem,
  isInputValid: isInputValid(state.newItem),
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem: itemValue => dispatch(addItem(itemValue)),
  onValueChange: itemValue => dispatch(changeValue(itemValue)),
  processKeyboardShorts: (inputKey, itemValue) => {
    if (inputKey === 'Enter' && isInputValid(itemValue)) {
      dispatch(addItem(itemValue));
    }
    else if (inputKey === 'Escape') {
      dispatch(cancelChange());
    }
  },
});

export const NewItem = connect(mapStateToProps, mapDispatchToProps)(NewItemComponent);
