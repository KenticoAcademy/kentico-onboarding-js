import * as React from 'react';
import { connect } from 'react-redux';
import {
  ItemToAddDispatchProps,
  ItemToAdd
} from '../components/ItemToAdd';
import { generateGuid } from '../utils/generateId';
import { postItem } from '../actions/thunkActions/postItem';


const mapDispatchToProps = (dispatch: ListDispatch): ItemToAddDispatchProps => ({
  postItem: (text: string) => dispatch(postItem(text, generateGuid))
});

const ItemToAddContainer: React.ComponentClass = connect(null, mapDispatchToProps)(ItemToAdd);
export { ItemToAddContainer as ItemToAdd };
