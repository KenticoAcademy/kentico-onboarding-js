import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemFormCallbackProps,
  ListItemForm as ListItemFormComponent,
} from '../components/ListItemForm';
import { Dispatch } from 'redux';
import {
  changeItemOpenStateAsync,
  deleteItemAsync,
  saveNewTextAsync,
} from '../actions/thunk';
import { IListItem } from '../models/interfaces/IListItem';
import { IAppState } from '../models/interfaces/IAppState';

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

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IListItemFormContainerDataProps): IListItemFormCallbackProps => ({
  onSave: (uri: string, newText: string) =>
    dispatch(
      saveNewTextAsync(
        uri,
        ownProps.item,
        newText,
      )),
  onDelete: (uri: string) =>
    dispatch(
      deleteItemAsync(
        uri,
        ownProps.item.id,
      )),
  onCancel: (uri: string) =>
    dispatch(
      changeItemOpenStateAsync(
        uri,
        ownProps.item,
      )),
});

const ListItemForm: ComponentClass<IListItemFormContainerDataProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemFormComponent);

ListItemForm.propTypes = propTypes;

export { ListItemForm };
