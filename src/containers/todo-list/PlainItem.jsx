import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  editItem,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { id } }) => ({
  onEditStart: () => dispatch(editItem(id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

connectedComponent.propTypes = {
  item: ImmutablePropTypes.contains({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as PlainItem };
