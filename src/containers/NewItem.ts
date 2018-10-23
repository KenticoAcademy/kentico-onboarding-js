import { connect } from 'react-redux';
import { INewItemDispatchProps, NewItem as NewItemComponent } from '../components/NewItem';
import { addItem } from '../actions';
import { IAction } from '../actions/IAction';
import { Dispatch } from 'redux';
import { ComponentClass } from 'react';

const mapDispatchToProps = (dispatch: Dispatch<IAction>): INewItemDispatchProps => ({
  onAddClick: (text: string) => dispatch(addItem(text)),
});

export const NewItem: ComponentClass =
  connect(null, mapDispatchToProps)(NewItemComponent);
