import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemFormCallbackProps,
  ListItemForm as ListItemFormComponent
} from '../components/ListItemForm';
import { Dispatch } from 'redux';
import { IAction } from '../models/IAction';
import { cancelItem, deleteItemFromServer } from '../actions/thunk';
import { saveItemChanges } from '../actions';
import { ListItem } from '../models/ListItem';

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
  readonly item: ListItem;
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListItemFormContainerDataProps): IListItemFormCallbackProps => ({
  onSave: (newText: string) => dispatch(saveItemChanges(
    ownProps.item.id,
    newText,
  )),
  onDelete: (uri: string) => deleteItemFromServer(
    uri,
    ownProps.item.id,
  )(dispatch),
  onCancel: (uri: string) => cancelItem(
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
