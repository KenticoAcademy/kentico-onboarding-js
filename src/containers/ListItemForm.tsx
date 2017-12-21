import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemFormCallbackProps,
  ListItemForm as ListItemFormComponent
} from '../components/ListItemForm';
import {
  deleteItem,
  cancelItemChanges,
  saveItemChanges,
} from '../actions';
import { Dispatch } from 'redux';
import { IAction } from '../models/IAction';
import { IListItem } from '../models/IListItem';

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
  readonly item: IListItem;
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListItemFormContainerDataProps): IListItemFormCallbackProps => ({
  onSave: (newText: string) => dispatch(saveItemChanges(
    ownProps.item.id,
    newText,
  )),
  onDelete: () => dispatch(deleteItem(
    ownProps.item.id,
  )),
  onCancel: () => dispatch(cancelItemChanges(
    ownProps.item.id,
  )),
});

const ListItemForm: ComponentClass<IListItemFormContainerDataProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemFormComponent);

ListItemForm.propTypes = propTypes;

export { ListItemForm };
