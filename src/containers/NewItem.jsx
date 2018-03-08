import { addItem } from '../actions';
import { connect } from 'react-redux';

import { NewItem as NewItemComponent } from '../components/NewItem';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: itemValue => dispatch(addItem(itemValue)),
});

export const NewItem = connect(null, mapDispatchToProps)(NewItemComponent);
