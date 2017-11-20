import { connect } from 'react-redux';
import { PlainItem } from '../../components/PlainItem';
import { startEdit } from '../../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch) => ({
  onEditStart: (id) => dispatch(startEdit(id)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

export { connectedComponent as PlainItemRedux };