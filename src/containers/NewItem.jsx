import { connect } from 'react-redux';

import { addItem } from '../actions';
import { NewItem as NewItemComponent } from '../components/NewItem';

const mapDispatchToProps = (dispatch) => ({
  addItem: itemValue => dispatch(addItem(itemValue)),
});

export const NewItem = connect(null, mapDispatchToProps)(NewItemComponent);
