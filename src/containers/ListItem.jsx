import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListItem as ListItemComponent } from '../components/ListItem';

const propTypes = {
  number: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { itemId }) => ({
  item: state.list.items.get(itemId),
});

const ListItem = connect(
  mapStateToProps,
)(ListItemComponent);

ListItem.propTypes = propTypes;

export { ListItem };
