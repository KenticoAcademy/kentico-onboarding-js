import { connect } from 'react-redux';
import { itemCreated } from '../actions/actionCreators';
import AddItem from '../components/AddItem';

const mapDispatchToProps = (dispatch) => ({
  onChange: (text) => dispatch(itemCreated(text)),
});

export default connect(
  null,
  mapDispatchToProps
)(AddItem);
