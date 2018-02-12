import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemFormCallbackProps,
  ListItemForm as ListItemFormComponent,
} from '../components/ListItemForm';
import { Dispatch } from 'redux';
import { IAction } from '../models/interfaces/IAction';
import {
  changeItemOpenStateAsync,
  deleteItemAsync,
  saveNewTextAsync,
} from '../actions/thunk';
import { IListItem } from '../models/interfaces/IListItem';

const propTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  selectionRangeStarts: PropTypes.number.isRequired,
  selectionRangeEnds: PropTypes.number.isRequired,
};

interface IListItemFormContainerDataProps {
  readonly itemNumber: number;
  readonly item: IListItem
  ;
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListItemFormContainerDataProps): IListItemFormCallbackProps => ({
  onSave: (uri: string, newText: string) => saveNewTextAsync(
    uri,
    ownProps.item,
    newText,
  )(dispatch),
  onDelete: (uri: string) => deleteItemAsync(
    uri,
    ownProps.item.id,
  )(dispatch),
  onCancel: (uri: string) => changeItemOpenStateAsync(
    uri,
    ownProps.item,
  )(dispatch),
});

const ListItemForm: ComponentClass<IListItemFormContainerDataProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemFormComponent);

ListItemForm.propTypes = propTypes;

export { ListItemForm };
