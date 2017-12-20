import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItemForm as ListItemFormComponent } from '../components/ListItemForm';
import {
  deleteItem,
  cancelItemChanges,
  saveItemChanges,
} from '../actions';
import { Dispatch } from 'redux';
import { IAction } from '../interfaces/IAction';
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
  itemNumber: number;
  item: IListItem;
  selectionRangeStarts: number;
  selectionRangeEnds: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListItemFormContainerDataProps) => ({
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

const ListItemForm = connect(
  null,
  mapDispatchToProps,
)(ListItemFormComponent);

ListItemForm.propTypes = propTypes;

export { ListItemForm };
