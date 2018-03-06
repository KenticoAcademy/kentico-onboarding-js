import { addItem } from '../actions';
import { connect } from 'react-redux';

import { NewItem as NewItemComponent } from '../components/NewItem';
import { getIdentifier } from '../utils/uuidService';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: newItemValue => dispatch(addItem(getIdentifier(), newItemValue)),
});

export const NewItem = connect(null, mapDispatchToProps)(NewItemComponent);
