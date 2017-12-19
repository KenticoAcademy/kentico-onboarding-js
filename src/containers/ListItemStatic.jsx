import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItemStatic as ListItemStaticComponent } from '../components/ListItemStatic';
import { openItemForEditing } from '../actions';

const propTypes = {
  number: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  onTextSelection: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onItemOpened: () => dispatch(openItemForEditing(
    ownProps.item.id,
  )),
});

const ListItemStatic = connect(
  null,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = propTypes;

export { ListItemStatic };
