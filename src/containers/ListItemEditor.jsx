import { connect } from 'react-redux';

import { ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import {
  deleteItem,
  saveItem,
} from '../actions/listActions';
import {
  stopItemEditing,
  changeItemValue,
} from '../actions/itemActions';
import { isInputValid } from '../utils/validationService';

const mapStateToProps = (state, { itemValue, bullet }) => ({
  itemValue,
  bullet,
  isInputValid: isInputValid(itemValue),
});

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  cancelItemEditing: () => dispatch(stopItemEditing(itemKey)),
  deleteItem: () => dispatch(deleteItem(itemKey)),
  saveItem: (itemValue) => dispatch(saveItem(itemKey, itemValue)),
  handleItemValueChange: (itemValue) => dispatch(changeItemValue(itemKey, itemValue)),
  handleKeyboardShortcuts: (inputKey, itemValue) => {
    if (inputKey === 'Enter' && isInputValid(itemValue)) {
      dispatch(saveItem(itemKey, itemValue));
    }
    else if (inputKey === 'Escape') {
      dispatch(stopItemEditing(itemKey));
    }
  },
});

export const ListItemEditor = connect(mapStateToProps, mapDispatchToProps)(ListItemEditorComponent);
