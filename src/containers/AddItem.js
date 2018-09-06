import { connect } from 'react-redux';
import { createItem } from '../actions/actionCreators';
import { AddItem } from '../components/AddItem';

const mapDispatchToProps = (dispatch) => ({
  onChange: (text) => dispatch(createItem(text)),
});

export default connect(
  null,
  mapDispatchToProps
)(AddItem);
