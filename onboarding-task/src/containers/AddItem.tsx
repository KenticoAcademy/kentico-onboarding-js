import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { postNewItem } from '../actions/actionCreators';
import { AddItem as AddItemComponent, IAddItemCallbackProps } from '../components/AddItem';
import { IStore } from '../interfaces/IStore';

const mapDispatchToProps = (dispatch: Dispatch<IStore>): IAddItemCallbackProps => ({
  onAddItem: (text: string) => postNewItem(text)(dispatch)// dispatch(createItem(text)),
});

const AddItem: React.ComponentClass = connect(null, mapDispatchToProps)(AddItemComponent);
export { AddItem };
