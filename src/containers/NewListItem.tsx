import * as React from 'react';
import { connect } from 'react-redux';
import { postItemRequest } from '../actions/itemsActions';
import {
  NewListItemDispatchProps,
  NewListItem as NewListItemComponent,
} from '../components/NewListItem';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch): NewListItemDispatchProps => ({
  addItem: (text: string) => dispatch<any>(postItemRequest(text)),
});

export const NewListItem: React.ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewListItemComponent);
