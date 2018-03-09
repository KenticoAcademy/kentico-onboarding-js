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
});

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  onCancel: () => dispatch(stopItemEditing(itemKey)),
  onDelete: () => dispatch(deleteItem(itemKey)),
  onSave: (itemValue) => dispatch(saveItem(itemKey, itemValue)),
  onItemValueChange: (itemValue) => dispatch(changeItemValue(itemKey, itemValue)),
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
