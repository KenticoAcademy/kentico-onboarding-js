import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItemForm as ListItemFormComponent } from '../components/ListItemForm';
import {
  deleteItem,
  cancelItemChanges,
  saveItemChanges,
} from '../actions';

const propTypes = {
  number: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  selectionRangeStarts: PropTypes.number.isRequired,
  selectionRangeEnds: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: newText => dispatch(saveItemChanges(
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
