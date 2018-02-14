import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemFormCallbackProps,
  ListItemForm as ListItemFormComponent,
} from '../components/ListItemForm';
import { Dispatch } from 'redux';
import {
  deleteItemAsync,
  saveNewTextAsync,
} from '../actions/thunk';
import { IListItem } from '../models/interfaces/IListItem';
import { IAppState } from '../models/interfaces/IAppState';
import { changeItemOpenState } from '../actions';

const propTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  selectionRangeStarts: PropTypes.number.isRequired,
  selectionRangeEnds: PropTypes.number.isRequired,
};

interface IListItemFormContainerDataProps {
  readonly itemNumber: number;
  readonly item: IListItem;
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { item: { id } }: IListItemFormContainerDataProps): IListItemFormCallbackProps => ({
  onSave: (text: string, uri: string) =>
    dispatch(
      saveNewTextAsync({
        uri,
        text,
        id,
      })),
  onDelete: (uri: string) =>
    dispatch(
      deleteItemAsync({
        uri,
        id,
      })),
  onCancel: () =>
    dispatch(
      changeItemOpenState(id)),
});

const ListItemForm: ComponentClass<IListItemFormContainerDataProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemFormComponent);

ListItemForm.propTypes = propTypes;

export { ListItemForm };
