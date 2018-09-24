import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createItem } from '../actions';
import { AddItem as AddItemComponent, IAddItemProps } from '../components/AddItem';

const mapDispatchToProps = (dispatch: Dispatch): IAddItemProps => ({
  onChange: (text: string) => dispatch(createItem(text)),
});

export const AddItem = connect(
  null,
  mapDispatchToProps,
)(AddItemComponent);
