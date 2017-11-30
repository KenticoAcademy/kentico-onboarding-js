import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';
import { getIndexedItem } from '../../selectors/getIndexedItem';

const mapStateToProps = (state, { id, index }) => ({
  item: getIndexedItem(state, index, id),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };
