import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AddItem as AddItemComponent, IAddItemDispatchProps } from '../components/AddItem';
import { addItem } from '../actions/ListActions';

const mapDispatchToProps = (dispatch: Dispatch): IAddItemDispatchProps => ({
  onAddItem: (text: string) => dispatch(addItem(text)),
});

export const AddItem: React.ComponentClass = connect(null, mapDispatchToProps)(AddItemComponent);
