import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { openItemForEditing } from '../actions';

const propTypes = {
  number: PropTypes.number.isRequired,
  item: PropTypes.shape({
    isBeingEdited: PropTypes.bool.isRequired,
  }),
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onItemOpened: () => dispatch(openItemForEditing(
    ownProps.item.id,
  )),
});

const ListItem = connect(
  null,
  mapDispatchToProps,
)(ListItemComponent);

ListItem.propTypes = propTypes;

export { ListItem };
